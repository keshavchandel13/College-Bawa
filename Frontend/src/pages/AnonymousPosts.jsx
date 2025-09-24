import React from 'react';
import { motion } from 'framer-motion';
import { PostInput } from '../features/anonymouspost/PostInput';
import { PostFeed } from '../features/anonymouspost/PostFeed';
import '../styles/anonymouspost/anonymouspost.css';

export default function AnonymousPosts() {
  const posts = [
    {
      id: "1",
      content: "Everyone around me is cracking DSA problems like it’s nothing, and I can’t even solve the basics. Feeling so behind.",
      timestamp: "5 minutes ago",
      likes: 22,
      comments: 10,
      shares: 1,
    },
    {
      id: "2",
      content: "It feels like every time I open LinkedIn someone has landed an internship. Meanwhile, I haven’t even cleared the basics of coding tests.",
      timestamp: "25 minutes ago",
      likes: 30,
      comments: 14,
      shares: 2,
    },
    {
      id: "3",
      content: "I keep practicing DSA but the moment I see a slightly different problem, my mind just goes blank. Starting to wonder if I’m even cut out for this.",
      timestamp: "1 hour ago",
      likes: 40,
      comments: 18,
      shares: 3,
    },
    {
      id: "4",
      content: "It’s tough watching classmates prepare for FAANG interviews while I still struggle with basic recursion. Feeling left out.",
      timestamp: "2 hours ago",
      likes: 35,
      comments: 12,
      shares: 4,
    },
    {
      id: "5",
      content: "Just finished my first week of classes and it feels overwhelming already 😅 Anyone else struggling?",
      timestamp: "3 hours ago",
      likes: 12,
      comments: 3,
      shares: 1,
    },
  ];

  return (
    <div className="ap-anonymous-posts">
      <motion.h1 
        className="ap-heading-main"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Anonymous Posts 💭
      </motion.h1>

      <motion.h2
        className="ap-heading-sub"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Share your thoughts freely in our safe college community space
      </motion.h2>

      <motion.p 
        className="ap-support-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        If you’re feeling overwhelmed, please know you’re not alone. Consider reaching out to a friend, counselor, or mental health professional for support.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <PostInput />
      </motion.div>

      <motion.div 
        className="ap-post-feed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <PostFeed posts={posts} />
      </motion.div>
    </div>
  );
}
