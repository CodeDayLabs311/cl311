import React from 'react';
import { IGuestBookMessage } from '@/models';

export type GuestBookListItemProps = {
    message: IGuestBookMessage;
};

export default function GuestBookListItem({ message }: GuestBookListItemProps) {
    return (
        <span>
            {message.messageId} {message.author} {message.message}
        </span>
    );
}
