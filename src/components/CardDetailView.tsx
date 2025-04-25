
import { useState } from "react";
import { Calendar, Tag, CheckSquare, User, Plus } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

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

interface CardDetailViewProps {
  card: Card;
}

export function CardDetailView({ card }: CardDetailViewProps) {
  const [description, setDescription] = useState(card.description || "");
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  // Function to toggle checklist item state
  const handleChecklistItemToggle = (itemId: string) => {
    // This would update the card state in a real app
    console.log("Toggle checklist item:", itemId);
  };

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

  return (
    <div className="space-y-6">
      {/* Description */}
      <div>
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <span>Description</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-2 h-6 text-xs"
            onClick={() => setIsEditingDescription(!isEditingDescription)}
          >
            {isEditingDescription ? "Save" : "Edit"}
          </Button>
        </h3>
        
        {isEditingDescription ? (
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a more detailed description..."
            rows={4}
            className="w-full"
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            {description || "No description provided."}
          </p>
        )}
      </div>

      <Separator />

      {/* Tags */}
      <div>
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <Tag className="h-4 w-4 mr-2" />
          <span>Tags</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-2 h-6 text-xs"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add
          </Button>
        </h3>
        
        <div className="flex flex-wrap gap-1">
          {card.tags.length > 0 ? (
            card.tags.map((tag) => (
              <span
                key={tag.id}
                className={`tag ${getTagColorClass(tag.color)}`}
              >
                {tag.name}
              </span>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No tags added.</p>
          )}
        </div>
      </div>

      <Separator />

      {/* Deadline */}
      <div>
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Deadline</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-2 h-6 text-xs"
          >
            {card.deadline ? "Change" : "Add"}
          </Button>
        </h3>
        
        {card.deadline ? (
          <p className="text-sm">
            {format(new Date(card.deadline), "MMMM d, yyyy")}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">No deadline set.</p>
        )}
      </div>

      <Separator />

      {/* Checklist */}
      <div>
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <CheckSquare className="h-4 w-4 mr-2" />
          <span>Checklist</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-2 h-6 text-xs"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Item
          </Button>
        </h3>
        
        {card.checklist.length > 0 ? (
          <div className="space-y-2">
            {card.checklist.map((item) => (
              <div key={item.id} className="flex items-start">
                <Checkbox
                  id={`checklist-${item.id}`}
                  checked={item.completed}
                  onCheckedChange={() => handleChecklistItemToggle(item.id)}
                  className="mt-0.5"
                />
                <label
                  htmlFor={`checklist-${item.id}`}
                  className={`ml-2 text-sm ${
                    item.completed ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {item.text}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No checklist items added.</p>
        )}
      </div>

      <Separator />

      {/* Watchers */}
      <div>
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <User className="h-4 w-4 mr-2" />
          <span>Watchers</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-2 h-6 text-xs"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add
          </Button>
        </h3>
        
        {card.watchers.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {card.watchers.map((watcher, index) => (
              <div 
                key={index} 
                className="px-2 py-1 bg-muted text-xs rounded-full"
              >
                {watcher}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No watchers added.</p>
        )}
      </div>

      <Separator />

      {/* Comments */}
      <div>
        <h3 className="text-sm font-medium mb-2">Comments</h3>
        
        {card.comments.length > 0 ? (
          <div className="space-y-3">
            {card.comments.map((comment) => (
              <div key={comment.id} className="bg-muted rounded-md p-3">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-xs">{comment.user}</span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(comment.timestamp), "MMM d, h:mm a")}
                  </span>
                </div>
                <p className="text-sm">{comment.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No comments yet.</p>
        )}

        <div className="mt-4">
          <Textarea
            placeholder="Write a comment..."
            className="w-full"
            rows={2}
          />
          <div className="flex justify-end mt-2">
            <Button size="sm">
              Add Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
