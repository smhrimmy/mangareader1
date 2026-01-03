import React from 'react';
import { useParams } from 'react-router-dom';
import ReaderManga from '../components/ReaderManga';
import ReaderNovel from '../components/ReaderNovel';
import { AppMode } from '../types';

const Read: React.FC = () => {
  const { mode, id, chapter } = useParams<{ mode: string; id: string; chapter: string }>();

  if (!mode || !id) return null;

  const isManga = mode === AppMode.MANGA;

  // Ideally fetch title from ID here
  const mockTitle = isManga ? "Solo Leveling: Reawakened" : "Shadow Slave";

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {isManga ? (
        <ReaderManga title={mockTitle} chapterId={chapter || '1'} />
      ) : (
        <ReaderNovel title={mockTitle} chapterId={chapter || '1'} />
      )}
    </div>
  );
};

export default Read;