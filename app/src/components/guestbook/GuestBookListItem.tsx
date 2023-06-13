import React from 'react';
import { IGuestBookMessage } from '@/models';
import styles from './GuestBookListItem.module.scss';

export type GuestBookListItemProps = {
    message: IGuestBookMessage;
};

export default function GuestBookListItem({ message }: GuestBookListItemProps) {
    return (
        <div className={styles.guestBookListItem}>
            <h3>Message from {message.author}</h3>
            <blockquote>{message.message}</blockquote>
        </div>
    );
}
