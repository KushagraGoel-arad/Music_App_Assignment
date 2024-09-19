"use client";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCodeBranch, faHeart, faHeadphones } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar bg-gray-800 text-white p-4 h-screen w-1/6 border-r border-gray-700">
    
      <div className="text-2xl font-bold text-center py-4">
        Music App
      </div>
      
     
      <div className="menu-item my-4">
        <button 
          className={`text-left w-full p-2 flex items-center rounded-lg ${activeTab === 'home' ? 'bg-red-500' : 'hover:bg-gray-700'}`}
          onClick={() => setActiveTab('home')}
        >
          <FontAwesomeIcon icon={faHome} className="mr-3" />
          <span className={`text-sm ${activeTab === 'home' ? 'font-bold' : ''}`}>Home</span>
        </button>
      </div>

      <div className="menu-item my-4">
        <button 
          className={`text-left w-full p-2 flex items-center rounded-lg ${activeTab === 'browse' ? 'bg-red-500' : 'hover:bg-gray-700'}`}
          onClick={() => setActiveTab('browse')}
        >
          <FontAwesomeIcon icon={faCodeBranch} className="mr-3" />
          <span className={`text-sm ${activeTab === 'browse' ? 'font-bold' : ''}`}>Browse</span>
        </button>
      </div>

      <div className="menu-item my-4">
        <button 
          className={`text-left w-full p-2 flex items-center rounded-lg ${activeTab === 'favorites' ? 'bg-red-500' : 'hover:bg-gray-700'}`}
          onClick={() => setActiveTab('favorites')}
        >
          <FontAwesomeIcon icon={faHeart} className="mr-3" />
          <span className={`text-sm ${activeTab === 'favorites' ? 'font-bold' : ''}`}>Favorites</span>
        </button>
      </div>

      <div className="menu-item my-4">
        <button 
          className={`text-left w-full p-2 flex items-center rounded-lg ${activeTab === 'library' ? 'bg-red-500' : 'hover:bg-gray-700'}`}
          onClick={() => setActiveTab('library')}
        >
          <FontAwesomeIcon icon={faHeadphones} className="mr-3" />
          <span className={`text-sm ${activeTab === 'library' ? 'font-bold' : ''}`}>Library</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
