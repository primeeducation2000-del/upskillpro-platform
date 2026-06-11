import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bookmark,
  BookmarkCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Search,
  Volume2,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { coursebookLibrary } from './coursebookData.js';

const STORAGE_KEY = 'upskillpro-coursebook-state';

function readStoredState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveStoredState(nextState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

function flattenPages(book) {
  return book.chapters.flatMap((chapter) => chapter.pages.map((page) => ({ ...page, chapterTitle: chapter.title })));
}

export default function EspCoursebookWidget({ startOpen = false, onClosed }) {
  const [isOpen, setIsOpen] = useState(startOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(coursebookLibrary[0].id);
  const [pageIndex, setPageIndex] = useState(0);
  const [bookmarks, setBookmarks] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [turnDirection, setTurnDirection] = useState('next');
  const [tocOpen, setTocOpen] = useState(() => (typeof window === 'undefined' ? true : window.innerWidth > 720));
  const [quizAnswers, setQuizAnswers] = useState({});
  const [writingResponses, setWritingResponses] = useState({});
  const [dragItems, setDragItems] = useState({});
  const contentRef = useRef(null);

  const selectedBook = useMemo(
    () => coursebookLibrary.find((book) => book.id === selectedBookId) || coursebookLibrary[0],
    [selectedBookId]
  );
  const pages = useMemo(() => flattenPages(selectedBook), [selectedBook]);
  const currentPage = pages[pageIndex] || pages[0];
  const progress = Math.round(((pageIndex + 1) / pages.length) * 100);
  const currentPageKey = `${selectedBook.id}:${currentPage.id}`;

  useEffect(() => {
    const stored = readStoredState();
    if (stored.selectedBookId) setSelectedBookId(stored.selectedBookId);
    if (Number.isInteger(stored.pageIndex)) setPageIndex(stored.pageIndex);
    if (Array.isArray(stored.bookmarks)) setBookmarks(stored.bookmarks);
    if (stored.quizAnswers) setQuizAnswers(stored.quizAnswers);
    if (stored.writingResponses) setWritingResponses(stored.writingResponses);
    if (stored.dragItems) setDragItems(stored.dragItems);
  }, []);

  useEffect(() => {
    if (!pages[pageIndex]) setPageIndex(0);
  }, [pageIndex, pages]);

  useEffect(() => {
    saveStoredState({
      selectedBookId,
      pageIndex,
      bookmarks,
      quizAnswers,
      writingResponses,
      dragItems,
      updatedAt: new Date().toISOString(),
    });
  }, [bookmarks, dragItems, pageIndex, quizAnswers, selectedBookId, writingResponses]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
      if (event.key === 'ArrowRight') goToPage(pageIndex + 1, 'next');
      if (event.key === 'ArrowLeft') goToPage(pageIndex - 1, 'previous');
      if ((event.ctrlKey || event.metaKey) && event.key === '+') setZoom((value) => Math.min(1.25, value + 0.08));
      if ((event.ctrlKey || event.metaKey) && event.key === '-') setZoom((value) => Math.max(0.86, value - 0.08));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, pageIndex]);

  const closeBook = () => {
    setIsOpen(false);
    onClosed?.();
  };

  const goToPage = (nextIndex, direction = nextIndex > pageIndex ? 'next' : 'previous') => {
    if (nextIndex < 0 || nextIndex >= pages.length) return;
    setTurnDirection(direction);
    setPageIndex(nextIndex);
    requestAnimationFrame(() => contentRef.current?.focus());
  };

  const changeBook = (bookId) => {
    setSelectedBookId(bookId);
    setPageIndex(0);
    setTurnDirection('next');
  };

  const toggleBookmark = () => {
    setBookmarks((current) =>
      current.includes(currentPageKey) ? current.filter((item) => item !== currentPageKey) : [...current, currentPageKey]
    );
  };

  const updateDragOrder = (pageId, fromIndex, toIndex) => {
    const currentItems = dragItems[pageId] || currentPage.items;
    const nextItems = [...currentItems];
    const [moved] = nextItems.splice(fromIndex, 1);
    nextItems.splice(toIndex, 0, moved);
    setDragItems((current) => ({ ...current, [pageId]: nextItems }));
  };

  const shellClass = [
    'coursebook-overlay',
    isOpen ? 'open' : '',
    isMinimized ? 'minimized' : '',
    isFullscreen ? 'fullscreen' : '',
  ].join(' ');

  return (
    <>
      {isOpen && (
        <div className={shellClass} role="dialog" aria-modal="true" aria-label="Interactive ESP coursebook">
          <div className="coursebook-backdrop" onClick={closeBook} aria-hidden="true" />
          <section className="coursebook-shell">
            <header className="coursebook-topbar">
              <div>
                <span>Interactive ESP Coursebook</span>
                <strong>{selectedBook.title}</strong>
              </div>
              <div className="coursebook-actions">
                <button type="button" onClick={() => setZoom((value) => Math.max(0.86, value - 0.08))} aria-label="Zoom out">
                  <ZoomOut size={18} />
                </button>
                <span className="coursebook-zoom">{Math.round(zoom * 100)}%</span>
                <button type="button" onClick={() => setZoom((value) => Math.min(1.25, value + 0.08))} aria-label="Zoom in">
                  <ZoomIn size={18} />
                </button>
                <button type="button" onClick={() => setIsFullscreen((value) => !value)} aria-label="Toggle full screen mode">
                  {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                <button type="button" onClick={() => setIsMinimized(true)} aria-label="Minimise coursebook">
                  <Minimize2 size={18} />
                </button>
                <button type="button" onClick={closeBook} aria-label="Close coursebook">
                  <X size={18} />
                </button>
              </div>
            </header>

            {isMinimized ? (
              <button className="coursebook-minibar" type="button" onClick={() => setIsMinimized(false)}>
                <BookOpen size={20} />
                <span>{selectedBook.title}</span>
                <strong>{progress}%</strong>
              </button>
            ) : (
              <div className="coursebook-workspace">
                <aside className={`coursebook-toc ${tocOpen ? 'open' : ''}`}>
                  <div className="coursebook-library">
                    <label>
                      <span>ESP Pathway</span>
                      <select value={selectedBookId} onChange={(event) => changeBook(event.target.value)}>
                        {coursebookLibrary.map((book) => (
                          <option key={book.id} value={book.id}>{book.pathway}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="coursebook-search">
                    <Search size={16} />
                    <span>Table of Contents</span>
                  </div>
                  {selectedBook.chapters.map((chapter) => (
                    <div className="coursebook-chapter" key={chapter.id}>
                      <strong>{chapter.title}</strong>
                      {chapter.pages.map((page) => {
                        const absoluteIndex = pages.findIndex((item) => item.id === page.id);
                        const pageKey = `${selectedBook.id}:${page.id}`;
                        return (
                          <button
                            key={page.id}
                            className={absoluteIndex === pageIndex ? 'active' : ''}
                            type="button"
                            onClick={() => {
                              goToPage(absoluteIndex);
                              if (window.innerWidth <= 720) setTocOpen(false);
                            }}
                          >
                            <span>{page.title}</span>
                            {bookmarks.includes(pageKey) && <BookmarkCheck size={15} />}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </aside>

                <main className="coursebook-reader">
                  <div className="coursebook-reader-toolbar">
                    <button type="button" onClick={() => setTocOpen((value) => !value)}>
                      Table of Contents
                    </button>
                    <div className="coursebook-progress" aria-label={`Reading progress ${progress}%`}>
                      <span style={{ transform: `scaleX(${progress / 100})` }} />
                    </div>
                    <strong>{progress}% complete</strong>
                  </div>

                  <article
                    className={`coursebook-page page-turn-${turnDirection}`}
                    style={{ '--book-zoom': zoom }}
                    tabIndex="-1"
                    ref={contentRef}
                  >
                    <div className="coursebook-page-meta">
                      <span>{currentPage.chapterTitle}</span>
                      <span>{currentPage.cefr}</span>
                      <span>{currentPage.duration}</span>
                    </div>
                    <div className="coursebook-page-head">
                      <div>
                        <p>{selectedBook.pathway}</p>
                        <h2>{currentPage.title}</h2>
                      </div>
                      <button
                        type="button"
                        className={bookmarks.includes(currentPageKey) ? 'bookmarked' : ''}
                        onClick={toggleBookmark}
                        aria-label={bookmarks.includes(currentPageKey) ? 'Remove bookmark' : 'Bookmark this page'}
                      >
                        {bookmarks.includes(currentPageKey) ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                      </button>
                    </div>
                    <PageContent
                      page={currentPage}
                      quizAnswers={quizAnswers}
                      setQuizAnswers={setQuizAnswers}
                      writingResponses={writingResponses}
                      setWritingResponses={setWritingResponses}
                      dragItems={dragItems}
                      updateDragOrder={updateDragOrder}
                    />
                  </article>

                  <div className="coursebook-nav">
                    <button type="button" onClick={() => goToPage(pageIndex - 1, 'previous')} disabled={pageIndex === 0}>
                      <ChevronLeft size={18} />
                      Previous
                    </button>
                    <span>Page {pageIndex + 1} of {pages.length}</span>
                    <button type="button" onClick={() => goToPage(pageIndex + 1, 'next')} disabled={pageIndex === pages.length - 1}>
                      Next
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </main>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}

function PageContent({ page, quizAnswers, setQuizAnswers, writingResponses, setWritingResponses, dragItems, updateDragOrder }) {
  if (page.type === 'audio') return <AudioPage page={page} />;
  if (page.type === 'video') return <VideoPage page={page} />;
  if (page.type === 'quiz') return <QuizPage page={page} quizAnswers={quizAnswers} setQuizAnswers={setQuizAnswers} />;
  if (page.type === 'flashcards') return <FlashcardPage page={page} />;
  if (page.type === 'drag') return <DragPage page={page} dragItems={dragItems} updateDragOrder={updateDragOrder} />;
  if (page.type === 'writing') {
    return (
      <WritingPage
        page={page}
        value={writingResponses[page.id] || ''}
        onChange={(value) => setWritingResponses((current) => ({ ...current, [page.id]: value }))}
      />
    );
  }

  return (
    <div className="coursebook-lesson">
      {page.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      <div className="coursebook-practice">
        <strong>Practice</strong>
        <p>{page.practice}</p>
      </div>
    </div>
  );
}

function AudioPage({ page }) {
  const [playing, setPlaying] = useState(false);

  const speak = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(page.transcript);
    utterance.rate = 0.88;
    utterance.onend = () => setPlaying(false);
    setPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis?.cancel();
    setPlaying(false);
  };

  return (
    <div className="coursebook-media-card">
      <Volume2 size={30} />
      <h3>{page.prompt}</h3>
      <p>{page.transcript}</p>
      <button type="button" onClick={playing ? stop : speak}>
        {playing ? <Pause size={18} /> : <Play size={18} />}
        {playing ? 'Stop audio' : 'Play audio'}
      </button>
    </div>
  );
}

function VideoPage({ page }) {
  return (
    <div className="coursebook-video">
      <p>{page.summary}</p>
      <iframe
        title={page.title}
        src={page.videoUrl}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function QuizPage({ page, quizAnswers, setQuizAnswers }) {
  const selected = quizAnswers[page.id];
  const answered = Number.isInteger(selected);
  const correct = selected === page.answer;

  return (
    <div className="coursebook-quiz">
      <h3>{page.question}</h3>
      <div className="coursebook-quiz-options">
        {page.options.map((option, index) => (
          <button
            key={option}
            type="button"
            className={selected === index ? 'selected' : ''}
            onClick={() => setQuizAnswers((current) => ({ ...current, [page.id]: index }))}
          >
            {option}
          </button>
        ))}
      </div>
      {answered && (
        <div className={`coursebook-feedback ${correct ? 'correct' : 'review'}`}>
          <Check size={18} />
          <span>{correct ? 'Correct.' : 'Review this answer.'} {page.feedback}</span>
        </div>
      )}
    </div>
  );
}

function FlashcardPage({ page }) {
  const [activeCard, setActiveCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = page.cards[activeCard];

  return (
    <div className="coursebook-flashcards">
      <button type="button" className={flipped ? 'flipped' : ''} onClick={() => setFlipped((value) => !value)}>
        <span>{flipped ? card[1] : card[0]}</span>
        <small>{flipped ? 'Definition' : 'Tap to reveal meaning'}</small>
      </button>
      <div>
        {page.cards.map((item, index) => (
          <button
            key={item[0]}
            type="button"
            className={index === activeCard ? 'active' : ''}
            onClick={() => {
              setActiveCard(index);
              setFlipped(false);
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

function DragPage({ page, dragItems, updateDragOrder }) {
  const items = dragItems[page.id] || page.items;
  const isCorrect = items.every((item, index) => item === page.items[index]);

  return (
    <div className="coursebook-drag">
      <p>{page.instruction}</p>
      <div className="coursebook-drag-list">
        {items.map((item, index) => (
          <div key={item}>
            <span>{index + 1}</span>
            <strong>{item}</strong>
            <div>
              <button type="button" onClick={() => updateDragOrder(page.id, index, Math.max(0, index - 1))} disabled={index === 0}>Up</button>
              <button type="button" onClick={() => updateDragOrder(page.id, index, Math.min(items.length - 1, index + 1))} disabled={index === items.length - 1}>Down</button>
            </div>
          </div>
        ))}
      </div>
      <div className={`coursebook-feedback ${isCorrect ? 'correct' : 'review'}`}>
        <Check size={18} />
        <span>{isCorrect ? 'Order complete.' : 'Move the steps until the professional sequence is correct.'}</span>
      </div>
    </div>
  );
}

function WritingPage({ page, value, onChange }) {
  return (
    <div className="coursebook-writing">
      <p>{page.prompt}</p>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows="8" placeholder="Write your answer here..." />
      <span>{value.trim().split(/\s+/).filter(Boolean).length} words saved automatically</span>
    </div>
  );
}
