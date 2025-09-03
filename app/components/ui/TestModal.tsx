'use client';

import React from 'react';

interface TestModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function TestModal({ isOpen, onClose, title }: TestModalProps) {
  console.log('TestModal render:', { isOpen, title });
  
  if (!isOpen) {
    console.log('TestModal not rendering - isOpen is false');
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-red-500/50 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg p-8 shadow-xl max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Test Modal</h2>
        <p className="mb-4">Service: {title}</p>
        <button 
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Close Test Modal
        </button>
      </div>
    </div>
  );
}