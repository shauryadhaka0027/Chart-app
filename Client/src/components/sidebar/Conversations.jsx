import React from 'react';
import Conversation from './Conversation';
import { getRandomEmoji } from '../../utils/emoji';
import useGetConversation from '../../Hooks/useGetConversation';

const Conversations = () => {
  const { loading, conversations } = useGetConversation();
  console.log("conversations-myyy", conversations);

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {loading ? <span className='loading loading-spinner'></span> : null}
      {conversations && conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIndex={idx === conversations.length - 1}
        />
      ))}
    </div>
  );
};

export default Conversations;
