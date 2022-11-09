import { useState, useEffect, useContext, useRef } from 'react';
import { Image } from 'react-bootstrap';

import styles from './Inbox.module.css';

import GlobalContext from '../../../../../context/GlobalContext';
import Email from './Email/Email';

const Inbox = props => {

    const { subreddit, setSubreddit } = useContext(GlobalContext);

    const { selectedEmailIndex, setSelectedEmailIndex, setSelectedEmailId, abortFetch, setLoading, inboxLoading, setInboxLoading, inboxLoadingController } = props;

    const [cachedEmails, setCachedEmails] = useState({});
    const [emails, setEmails] = useState([]);

    const [postType, setPostType] = useState('hot');
    const postTypeDisplay = {
        hot: 'Hot',
        top: 'Top (All)',
        topYear: 'Top (Year)',
        topMonth: 'Top (Month)',
        topWeek: 'Top (Week)',
        topDay: 'Top (Day)',
    }
    const [isHoverFilter, setIsHoverFilter] = useState(false);
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const emailListEl = useRef(null);

    const { signal } = inboxLoadingController;

    useEffect(() => {
        console.log(`Fetching posts: ${postType}`);
        fetchPosts(postType);
    }, [subreddit]);

    const fetchPosts = type => {
        let url = '';
        switch(type){
            case 'hot':
            url = `http://localhost:5000/${subreddit}/hot`;
            break;
            case 'top':
            url = `http://localhost:5000/${subreddit}/top?time=all`
            break;
            case 'topYear':
            url = `http://localhost:5000/${subreddit}/top?time=year`
            break;
            case 'topMonth':
            url = `http://localhost:5000/${subreddit}/top?time=month`
            break;
            case 'topWeek':
            url = `http://localhost:5000/${subreddit}/top?time=week`
            break;
            case 'topDay':
            url = `http://localhost:5000/${subreddit}/top?time=day`
            break;
        }

        if(!subreddit) return;

        fetch(url, {method: 'GET', signal})
            .then(res => res.json()
                .then(data => {
                    // console.log(data);
                    setEmails(data);
                    setSelectedEmailIndex(0);

                    emailListEl?.current?.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });

                    setInboxLoading(false);
                    
                })
                .catch(err => console.log(err)))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        console.log(selectedEmailIndex);
        if(selectedEmailIndex != null){
            console.log(emails[selectedEmailIndex]?.id || null);
            setSelectedEmailId(emails[selectedEmailIndex]?.id || null);
        }
    }, [selectedEmailIndex]);

    const markRead = index => {
        if(!emails[index].unread) return;
        
        let newEmails = emails;
        newEmails[index].unread = false;
        setEmails(newEmails);
    }
    const markUnread = index => {
        if(emails[index].unread) return;
        
        let newEmails = emails;
        newEmails[index].unread = true;
        setEmails(newEmails);
    }

    return (
        <div className={styles.main}>

            <div className={styles.header}>
                <div className={styles.checkmark_img_container}>
                    <Image 
                        src={'./media/inbox/checkmark.png'}
                        className={styles.img}/>
                </div>
                <div className={`${styles.section} ${styles.focused}`}>
                    <span className={styles.text}>Focused</span>
                </div>
                <div className={styles.section}>
                    <span className={styles.text}>{inboxLoading ? 'Loading...' : isHoverFilter ? postTypeDisplay[postType] : 'Other'}</span>
                </div>
                
                <div 
                    className={styles.filter_container}
                    onClick={e => {
                        e.preventDefault();

                        setIsOpenFilter(!isOpenFilter);
                    }}
                    
                    onMouseEnter={e => setIsHoverFilter(true)}
                    onMouseLeave={e => setIsHoverFilter(false)}>
                    <div className={styles.img_container}>
                        <Image 
                            src={'./media/inbox/filter.png'}
                            className={styles.img}/>
                    </div>
                    <span 
                        className={styles.text}>
                        Filter
                    </span>
                    {
                        isOpenFilter &&
                        <div className={styles.filter_dropdown}>
                        {
                            Object.entries(postTypeDisplay).map(([type, typeStr], i) => {
                                return <div 
                                    key={i.toString()}
                                    className={styles.type_container}
                                    onClick={e => {
                                        setPostType(type);
                                        fetchPosts(type);
                                        setInboxLoading(true);
                                    }}>
                                    <div className={styles.checked_container}>

                                    </div>
                                    <div className={styles.image_container}>

                                    </div>
                                    <span className={styles.text}>{typeStr}</span>
                                </div>
                            })
                        }
                        </div>
                    }
                </div>
            </div>

            <div className={styles.email_list} ref={emailListEl}>
            {
                emails.map((email, i) => {
                    return <Email 
                        key={i.toString()}
                        index={i}
                        {...email}
                        selectedEmailIndex={selectedEmailIndex}
                        setSelectedEmailIndex={setSelectedEmailIndex}
                        markRead={markRead}
                        markUnread={markUnread}
                        abortFetch={abortFetch}
                        setLoading={setLoading}/>
                })
            }
            </div>
        </div>
    )
}

export default Inbox;