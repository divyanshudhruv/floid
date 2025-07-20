"use client";

import React, { useState } from "react";
import { 
  Row, 
  Column, 
  Text,
  IconButton,
  SmartLink,
  DropdownWrapper,
  Option,
  Icon,
  Dialog,
  Button,
  useToast,
  Avatar
} from "@once-ui-system/core";

interface CommentProps {
  comment: {
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
    replies?: any[];
  };
}

export default function Comment({ comment }: CommentProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [reactionCount, setReactionCount] = useState(comment.reactions.hearts);
  const [hasReacted, setHasReacted] = useState(false);
  const { addToast } = useToast();
  
  const handleDeleteComment = async () => {
    setIsDeleting(true);
    
    try {
      addToast({
        message: 'Comment deleted successfully',
        variant: 'success',
      });
    } catch (error: any) {
      addToast({
        message: 'Failed to delete comment',
        variant: 'danger',
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };
  
  const toggleReaction = (e: React.MouseEvent) => {
    e.preventDefault();
    setHasReacted(!hasReacted);
    setReactionCount(reactionCount + (!hasReacted ? 1 : -1));
  };
  
  return (
    <Row gap="16" vertical="start" fillWidth paddingLeft="4">
      <Row paddingY="8">
        <SmartLink unstyled href="#">
          <Text onBackground="neutral-strong">
            <Avatar
              src={comment.user.avatar}
              size="m"
            />
          </Text>
        </SmartLink>
      </Row>
      
      <Column gap="4" fillWidth>
        <Row gap="8" vertical="center" marginBottom="4">
          <SmartLink unstyled href="#">
            <Text variant="body-default-s" onBackground="neutral-strong">
              {comment.user.name}
            </Text>
          </SmartLink>
          <Text variant="body-default-xs" onBackground="neutral-weak">
            {new Date(comment.createdAt).toLocaleString()}
          </Text>
        </Row>
        
        <Text variant="body-default-s">
          {comment.content}
        </Text>
        
        <Row gap="2" vertical="center">
          <Button
            variant="tertiary"
            size="s"
            data-border="rounded"
            onClick={(e: React.MouseEvent) => toggleReaction(e)}
            aria-label={hasReacted ? "Unlike comment" : "Like comment"}
            style={{ marginLeft: "-0.75rem" }}
          >
            {reactionCount > 0 && (
              <Text marginRight="4" variant="body-default-s" onBackground={hasReacted ? "danger-weak" : "neutral-weak"}>
                {reactionCount.toString()}
              </Text>
            )}
            <Icon
              size="xs"
              onBackground={hasReacted ? "danger-weak" : "neutral-strong"}
              name={hasReacted ? "heartFilled" : "heart"}
            />
          </Button>
          <DropdownWrapper
            placement="right-start"
            dropdown={
              <Column padding="4" gap="2" minWidth={8}>
                <Option
                  value="delete"
                  hasPrefix={<Icon name="trash" size="xs" />}
                  onClick={() => setShowDeleteDialog(true)}
                >
                  Delete
                </Option>
              </Column>
            }
            trigger={
              <IconButton
                data-border="rounded"
                size="m"
                icon="more"
                variant="tertiary"
                aria-label="Comment options"
              />
            }
          />
          
          <Dialog
            isOpen={showDeleteDialog}
            onClose={() => setShowDeleteDialog(false)}
            title="Delete Comment"
            description="Are you sure you want to delete this comment? This action cannot be undone."
            footer={
              <Row gap="8" horizontal="end" fillWidth>
                <Button 
                  variant="secondary" 
                  onClick={() => setShowDeleteDialog(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button 
                  variant="danger" 
                  onClick={handleDeleteComment}
                  loading={isDeleting}
                >
                  Delete
                </Button>
              </Row>
            }
          >
          </Dialog>
        </Row>
      </Column>
    </Row>
  );
}