import { useState, useEffect } from 'react';

import styles from './SectionList.module.css';

import SectionDropdown from './SectionDropdown/SectionDropdown';

const SectionList = props => {

    const [favourites, setFavourites] = useState({
        sections: [
            {
                title: 'Inbox',
                imgName: 'inbox',
                unreadNum: 2045,
                highlighted: true,
            },
            {
                title: 'Sent Items',
                imgName: 'sent_items',
            },
            {
                title: 'Drafts',
                imgName: 'drafts',
                unreadNum: 3,
            },
            {
                title: 'Deleted Items',
                imgName: 'deleted_items',
            },
        ],
        options: [
            'Add favourite',
        ],
    });

    const [folders, setFolders] = useState({
        sections: [
            {
                title: 'Inbox',
                imgName: 'inbox',
                unreadNum: 2045,
                highlighted: true,
            },
            {
                title: 'Sent Items',
                imgName: 'sent_items',
            },
            {
                title: 'Drafts',
                imgName: 'drafts',
                unreadNum: 3,
            },
            {
                title: 'Deleted Items',
                imgName: 'deleted_items',
            },
            {
                title: 'Junk Email',
                imgName: '',
            },
            {
                title: 'Archive',
                imgName: '',
                unreadNum: 2,
            },
            {
                title: 'Notes',
                imgName: '',
            },

            // Example Subreddits
            {
                title: 'all',
                imgName: '',
                subreddit: 'all',
            },
            {
                title: 'news',
                imgName: '',
                subreddit: 'news',
            },
            {
                title: 'bestofredditorupdates',
                imgName: '',
                subreddit: 'bestofredditorupdates',
            },
            {
                title: 'sgexams',
                imgName: '',
                subreddit: 'sgexams',
            },
            {
                title: 'relationship_advice',
                imgName: '',
                subreddit: 'relationship_advice',
            },
            {
                title: 'unresolvedmysteries',
                imgName: '',
                subreddit: 'unresolvedmysteries',
            },
            {
                title: 'todayilearned',
                imgName: '',
                subreddit: 'todayilearned',
            },
            {
                title: 'askreddit',
                imgName: '',
                subreddit: 'askreddit',
            },
            {
                title: 'askscience',
                imgName: '',
                subreddit: 'askscience',
            },
            {
                title: 'dataisbeautiful',
                imgName: '',
                subreddit: 'dataisbeautiful',
            },
            {
                title: 'youshouldknow',
                imgName: '',
                subreddit: 'youshouldknow',
            },
            {
                title: 'memes',
                imgName: '',
                subreddit: 'memes',
            },
            {
                title: 'lifeprotips',
                imgName: '',
                subreddit: 'lifeprotips',
            },
            {
                title: 'thathappened',
                imgName: '',
                subreddit: 'thathappened',
            },
            {
                title: 'letsnotmeet',
                imgName: '',
                subreddit: 'letsnotmeet',
            },
            {
                title: 'writingprompts',
                imgName: '',
                subreddit: 'writingprompts',
            },
            {
                title: 'astrophotography',
                imgName: '',
                subreddit: 'astrophotography',
            },
            {
                title: 'offmychest',
                imgName: '',
                subreddit: 'offmychest',
            },
        ],
        options: [
            'Create new folder',
        ],
    });

    const [groups, setGroups] = useState({
        sections: [],
        options: [
            'New group',
            'Discover groups',
        ],
    });

    return (
        <div className={styles.main}>
            <SectionDropdown
                title='Favourites'
                sections={favourites.sections}
                options={favourites.options}
                expanded />
            <SectionDropdown
                title='Folders'
                sections={folders.sections}
                options={folders.options}
                expanded />
            <SectionDropdown
                title='Groups'
                sections={groups.sections}
                options={groups.options}
                expanded />
        </div>
    )
}

export default SectionList;