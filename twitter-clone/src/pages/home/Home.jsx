import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Followers from '../../components/followers/Followers'
import Search from '../../components/search/Search'
import Feed from '../../components/feed/Feed';
import "./home.css"
import { Rightside1 } from '../../components/Rightpart/Rightside1';

const Home = () => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollTop(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className='home__container'>
      {/* sidebar */}
      <Sidebar />

      <div className='both__fedd__and__right'>
        {/* Feed */}
        <Feed />

        {/* Right Section */}
        <div className='right__section'>
          <div className={`search__section ${scrollTop > 200 ? 'fixed-se' : ''}`} >
            <Search />
          </div>
          <Rightside1 />
          <div className={`followers__section ${scrollTop > 200 ? 'fixed' : ''}`}>
            <Followers />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home