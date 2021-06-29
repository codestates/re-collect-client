import React, { useState } from 'react';
import CategoryBox from '../components/CategoryBox';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import UnreadAlarm from '../components/UnreadAlarm';

export default function Collect() {
  return (
    <div className="collectview">
      <Sidebar />
      <div className="collectview__right">
        <div className="collectview__title">collect</div>
        <UnreadAlarm />
        <SearchBar />
        <div className="collectview__bookmarks">
          <CategoryBox />
          <CategoryBox />
          <CategoryBox />
          <CategoryBox />
          <CategoryBox />
          <CategoryBox />
          <CategoryBox />
          <CategoryBox />
          <CategoryBox />
        </div>
      </div>
    </div>
  );
}
