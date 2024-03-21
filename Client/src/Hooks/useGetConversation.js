import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useGetConversation = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);

            try {
                const res = await axios.get("http://localhost:9001/users", { withCredentials: true });
                const data = res.data.msg;
                if (data.error) {
                    throw new Error(data.error);
                }
                
                console.log("Fetched Conversations", data); 
                setConversations(data);
				
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, conversations };
};

export default useGetConversation;
