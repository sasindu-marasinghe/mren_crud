import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes from react-router-dom
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import PostDetails from './components/PostDetails';
import NavBar from './components/NavBar';
import Home from './components/Home';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <NavBar />
          <Routes> {/* Wrap Routes around your Route components */}
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/post/:id" element={<PostDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}
