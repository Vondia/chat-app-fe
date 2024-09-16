import { cva } from '../../styled-system/css'

export const chat = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '60%',
    borderLeft: '1px solid #d1dbe3',
    borderRight: '1px solid #d1dbe3',
  },
});

export const button = cva({
  base: {
    color: '#fff',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    borderRadius: '0.2rem',
    textAlign: 'center',
    border: '1px solid transparent',
    padding: '0.35rem 0.5rem',
    cursor: 'pointer',
  },
});

export const chatHeader = cva({
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f6fbff',
    fontSize: '1em',
    border: 'solid #d1dbe3',
    borderWidth: '0 0 1px',
    padding: '0.9em 0.9em',
    '& span': {
      fontWeight: '700',
      color: 'rgba(0, 0, 0, 0.87)',
    },
  },
});

export const chatMessageList = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 48px)',
    width: 'auto',
    overflow: 'auto',
    color: 'rgba(0, 0, 0, 0.87)',
    backgroundColor: '#fff',
    padding: '12px 8px',
  },
});

export const chatMessage = cva({
  base: {
    display: 'block',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '0.91em',
    margin: '0.4em 0 0',
    width: '50%',
  },
});

export const chatMessageWrapper = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export const chatMessageBubble = cva({
  base: {
    width: 'fit-content',
    borderRadius: '0 0.7em 0.7em 0',
    backgroundColor: '#c6e3fa',
    padding: '0.6em 0.9em',
  },
});

export const chatMessageBody = cva({
  base: {
    whiteSpace: 'pre-wrap',
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
  },
});

export const chatMessageAuthor = cva({
  base: {
    fontSize: '0.81em',
    fontWeight: '600',
    marginBottom: '2px',
  },
});

export const outgoing = cva({
  base: {
    marginLeft: 'auto',
    '& .chat-message-wrapper': {
      alignItems: 'end',
    },
    '& .chat-message-bubble': {
      backgroundColor: '#6bb9f2',
      borderRadius: '0.7em 0 0 0.7em',
    },
    '& .chat-message-author': {
      display: 'none',
    },
  },
});

export const chatComposer = cva({
  base: {
    display: 'flex',
    padding: '0.5em',
    borderTop: '1px solid #d1dbe3',
  },
});

export const chatComposerInput = cva({
  base: {
    width: '100%',
    border: '0',
    backgroundColor: '#c6e3fa',
    padding: '0.8em 0.9em',
    borderRadius: '0.7em',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '15px',
  },
});
