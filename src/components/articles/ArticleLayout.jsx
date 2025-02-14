import React from 'react';
import { Outlet } from 'react-router-dom';
import '../../style.css';

const ArticleLayout = ({ loading, coverImg, title, content }) => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ArticleLayout;