"use client";

import React, { useState, useEffect } from "react";
import {
  Row,
  Column,
  Text,
  Textarea,
  Heading,
  IconButton,
  EmojiPickerDropdown,
  Spinner,
  Avatar,
} from "@once-ui-system/core";
import { Comment } from "./Comment";

interface CommentProps {
  id: string;
  content: string;
  user: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  reactions: {
    hearts: number;
  };
  replies?: CommentProps[];
}

export function Comments() {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<CommentProps[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setComments([
        {
          id: "1",
          content: "Finally something fresh, something new. I love it my friend. You're coookin'!",
          user: {
            name: "Jony Ive",
            avatar: "/images/avatars/jony-ive.jpg",
          },
          createdAt: "2025-07-07T15:30:00Z",
          reactions: {
            hearts: 7,
          },
        },
        {
          id: "2",
          content: "@Jony buddy, will you migrate to Once UI finally or what...",
          user: {
            name: "Lorant One",
            avatar: "/images/creators/lorant.jpg",
          },
          createdAt: "2025-07-06T10:15:00Z",
          reactions: {
            hearts: 3,
          },
          replies: [
            {
              id: "2-1",
              content: "Dude yes, Sammy was so stoked to see this stuff!",
              user: {
                name: "Jony Ive",
                avatar: "/images/avatars/jony-ive.jpg",
              },
              createdAt: "2025-07-06T11:20:00Z",
              reactions: {
                hearts: 5,
              },
            },
          ],
        },
      ]);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmitComment = async () => {
    if (!comment.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newComment: CommentProps = {
        id: `new-${Date.now()}`,
        content: comment,
        user: {
          name: "Lorant",
          avatar: "/images/creators/lorant.jpg",
        },
        createdAt: new Date().toISOString(),
        reactions: {
          hearts: 0,
        },
      };

      setComments((prevComments) => [newComment, ...prevComments]);
      setComment("");
    } catch (err: any) {
      setSubmitError(err.message || "An error occurred while submitting your comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Column gap="24" maxWidth="s" fillWidth id="comments">
      <Heading marginLeft="64" variant="heading-strong-l">
        {comments.length > 0 ? "Join" : "Start"} the discussion!
      </Heading>

      <Row gap="4" fillWidth>
        <Row padding="8" fitHeight marginTop="4">
          <Avatar src="/images/creators/lorant.jpg" size="m" />
        </Row>

        <Column gap="8" fillWidth>
          <Textarea
            id="comment-input"
            placeholder="Add a comment..."
            lines="auto"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isSubmitting}
            error={!!submitError}
            errorMessage={submitError}
            hasSuffix={
              <Row style={{ opacity: comment.length > 0 ? 1 : 0 }} transition="micro-medium">
                <IconButton
                  style={{
                    marginRight: "-0.25rem",
                  }}
                  icon={isSubmitting ? "loading" : "send"}
                  size="m"
                  onClick={handleSubmitComment}
                  disabled={!comment || isSubmitting}
                />
              </Row>
            }
          >
            <EmojiPickerDropdown
              onSelect={(emoji) => setComment(comment + emoji)}
              trigger={
                <Row fillWidth paddingX="8" paddingBottom="8" data-border="rounded">
                  <IconButton icon="smiley" size="m" variant="tertiary" />
                </Row>
              }
            />
          </Textarea>
        </Column>
      </Row>

      {/* Comments list */}
      <Column gap="16" fillWidth>
        {isLoading ? (
          <Row center align="center" fillWidth gap="8">
            <Spinner size="s" />
            <Text variant="body-default-s" onBackground="neutral-weak" align="center" paddingY="l">
              Loading comments
            </Text>
          </Row>
        ) : error ? (
          <Text variant="body-default-s" onBackground="danger-weak" align="center" paddingY="l">
            {error}
          </Text>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <Column key={comment.id} gap="16" fillWidth>
              <Comment key={comment.id} comment={comment} />
              {comment.replies && comment.replies.length > 0 && (
                <Column gap="16" fillWidth paddingLeft="64">
                  {comment.replies.map((reply) => (
                    <Comment key={reply.id} comment={reply} />
                  ))}
                </Column>
              )}
            </Column>
          ))
        ) : (
          <Text variant="body-default-s" onBackground="neutral-weak" align="center" paddingY="l">
            No comments yet. Be the first to share your thoughts!
          </Text>
        )}
      </Column>
    </Column>
  );
}
