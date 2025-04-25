
import { useState } from "react";
import { Calendar, MessageSquare, Tag, CheckSquare, User } from "lucide-react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardDetailView } from "./CardDetailView";

// Types
type CardTag = {
  id: string;
  name: string;
  color: string;
};

type ChecklistItem = {
  id: string;
  text: string;
  completed: boolean;
};

type Comment = {
  id: string;
  text: string;
  user: string;
  timestamp: string;
};

type Card = {
  id: string;
  title: string;
  description?: string;
  tags: CardTag[];
  deadline?: string;
  comments: Comment[];
  checklist: ChecklistItem[];
  watchers: string[];
};

interface CardComponentProps {
  card: Card;
}

export function CardComponent({ card }: CardComponentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Get tag color class
  const getTagColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "tag-blue",
      green: "tag-green",
      red: "tag-red",
      yellow: "tag-yellow",
      purple: "tag-purple",
      pink: "tag-pink",
      gray: "tag-gray",
    };
    
    return colorMap[color] || "tag-gray";
  };

  // Count completed checklist items
  const completedItems = card.checklist.filter(item => item.completed).length;
  const totalItems = card.checklist.length;

  return (
    <>
      <div 
        className="kanban-card"
        onClick={() => setIsDialogOpen(true)}
      >
        {card.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {card.tags.map((tag) => (
              <span
                key={tag.id}
                className={`tag ${getTagColorClass(tag.color)}`}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
        
        <h4 className="font-medium mb-2">{card.title}</h4>
        
        {card.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {card.description}
          </p>
        )}

        <div className="flex items-center text-xs text-muted-foreground gap-3">
          {card.deadline && (
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{format(new Date(card.deadline), "MMM d")}</span>
            </div>
          )}
          
          {card.comments.length > 0 && (
            <div className="flex items-center">
              <MessageSquare className="h-3 w-3 mr-1" />
              <span>{card.comments.length}</span>
            </div>
          )}
          
          {totalItems > 0 && (
            <div className="flex items-center">
              <CheckSquare className="h-3 w-3 mr-1" />
              <span>{completedItems}/{totalItems}</span>
            </div>
          )}

          {card.watchers.length > 0 && (
            <div className="flex items-center ml-auto">
              <User className="h-3 w-3 mr-1" />
              <span>{card.watchers.length}</span>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{card.title}</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="ai">AI Suggestions</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-4">
              <CardDetailView card={card} />
            </TabsContent>
            <TabsContent value="activity" className="pt-4">
              <p className="text-muted-foreground">Activity log will be displayed here.</p>
            </TabsContent>
            <TabsContent value="chat" className="pt-4">
              <p className="text-muted-foreground">Chat functionality will be implemented here.</p>
            </TabsContent>
            <TabsContent value="ai" className="pt-4">
              <p className="text-muted-foreground">AI subtask suggestions will be implemented here.</p>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
