import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, MoreHorizontal, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CardComponent } from "@/components/CardComponent";
import { Textarea } from "@/components/ui/textarea";

// Types for our Kanban board
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

type List = {
  id: string;
  title: string;
  cards: Card[];
};

const Board = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState<any>(null);
  const { toast } = useToast();

  // Load board data from localStorage
  useEffect(() => {
    const savedBoards = localStorage.getItem("kanbanBoards");
    if (savedBoards) {
      const boards = JSON.parse(savedBoards);
      const currentBoard = boards.find((board: any) => board.id === id);
      
      if (currentBoard) {
        // Load or initialize lists for this board
        const savedBoardData = localStorage.getItem(`board-${id}`);
        if (savedBoardData) {
          setBoardData(JSON.parse(savedBoardData));
        } else {
          // Initialize new board with empty lists
          const initialBoardData = {
            lists: [
              { id: "list-1", title: "To Do", cards: [] },
              { id: "list-2", title: "In Progress", cards: [] },
              { id: "list-3", title: "Done", cards: [] }
            ]
          };
          setBoardData(initialBoardData);
          localStorage.setItem(`board-${id}`, JSON.stringify(initialBoardData));
        }
      } else {
        // Board not found, redirect to boards list
        toast({
          title: "Board not found",
          description: "The requested board could not be found.",
          variant: "destructive",
        });
        navigate("/boards");
      }
    }
  }, [id, navigate]);

  // Save board data whenever it changes
  useEffect(() => {
    if (boardData) {
      localStorage.setItem(`board-${id}`, JSON.stringify(boardData));
    }
  }, [boardData, id]);

  const [isAddListDialogOpen, setIsAddListDialogOpen] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [isAddCardDialogOpen, setIsAddCardDialogOpen] = useState(false);
  const [addingCardToListId, setAddingCardToListId] = useState<string | null>(null);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");
  const [editingListId, setEditingListId] = useState<string | null>(null);
  const [editedListTitle, setEditedListTitle] = useState("");

  // Drag and drop handler
  const handleDragEnd = (result: any) => {
    const { source, destination, type } = result;

    // Dropped outside the list
    if (!destination) return;

    // If the positions are the same, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If dragging a list
    if (type === "LIST") {
      const reorderedLists = [...boardData.lists];
      const [movedList] = reorderedLists.splice(source.index, 1);
      reorderedLists.splice(destination.index, 0, movedList);

      setBoardData({
        ...boardData,
        lists: reorderedLists,
      });
      return;
    }

    // If dragging a card
    const sourceList = boardData.lists.find(list => list.id === source.droppableId);
    const destinationList = boardData.lists.find(list => list.id === destination.droppableId);

    if (!sourceList || !destinationList) return;

    // If moving within the same list
    if (source.droppableId === destination.droppableId) {
      const newCards = [...sourceList.cards];
      const [movedCard] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, movedCard);

      const newLists = boardData.lists.map(list =>
        list.id === sourceList.id ? { ...list, cards: newCards } : list
      );

      setBoardData({
        ...boardData,
        lists: newLists,
      });
    } else {
      // Moving from one list to another
      const sourceCards = [...sourceList.cards];
      const [movedCard] = sourceCards.splice(source.index, 1);
      
      const destinationCards = [...destinationList.cards];
      destinationCards.splice(destination.index, 0, movedCard);

      const newLists = boardData.lists.map(list => {
        if (list.id === sourceList.id) {
          return { ...list, cards: sourceCards };
        }
        if (list.id === destinationList.id) {
          return { ...list, cards: destinationCards };
        }
        return list;
      });

      setBoardData({
        ...boardData,
        lists: newLists,
      });
    }
  };

  const handleAddList = () => {
    if (!newListTitle.trim()) {
      toast({
        title: "List title required",
        description: "Please enter a title for your new list.",
        variant: "destructive",
      });
      return;
    }

    const newList: List = {
      id: `list-${Date.now()}`,
      title: newListTitle,
      cards: [],
    };

    setBoardData({
      ...boardData,
      lists: [...boardData.lists, newList],
    });

    setIsAddListDialogOpen(false);
    setNewListTitle("");
    toast({
      title: "List created",
      description: `"${newListTitle}" list has been added successfully.`,
    });
  };

  const handleEditList = (listId: string) => {
    const list = boardData.lists.find(l => l.id === listId);
    if (list) {
      setEditingListId(listId);
      setEditedListTitle(list.title);
    }
  };

  const saveListEdit = () => {
    if (!editedListTitle.trim()) {
      toast({
        title: "List title required",
        description: "Please enter a title for your list.",
        variant: "destructive",
      });
      return;
    }

    const updatedLists = boardData.lists.map(list =>
      list.id === editingListId ? { ...list, title: editedListTitle } : list
    );

    setBoardData({
      ...boardData,
      lists: updatedLists,
    });

    setEditingListId(null);
    setEditedListTitle("");
  };

  const handleDeleteList = (listId: string) => {
    const updatedLists = boardData.lists.filter(list => list.id !== listId);
    
    setBoardData({
      ...boardData,
      lists: updatedLists,
    });

    toast({
      title: "List deleted",
      description: "The list has been deleted successfully.",
    });
  };

  const openAddCardDialog = (listId: string) => {
    setAddingCardToListId(listId);
    setNewCardTitle("");
    setNewCardDescription("");
    setIsAddCardDialogOpen(true);
  };

  const handleAddCard = () => {
    if (!newCardTitle.trim()) {
      toast({
        title: "Card title required",
        description: "Please enter a title for your new card.",
        variant: "destructive",
      });
      return;
    }

    if (!addingCardToListId) return;

    const newCard: Card = {
      id: `card-${Date.now()}`,
      title: newCardTitle,
      description: newCardDescription || undefined,
      tags: [],
      comments: [],
      checklist: [],
      watchers: [],
    };

    const updatedLists = boardData.lists.map(list =>
      list.id === addingCardToListId
        ? { ...list, cards: [...list.cards, newCard] }
        : list
    );

    setBoardData({
      ...boardData,
      lists: updatedLists,
    });

    setIsAddCardDialogOpen(false);
    setAddingCardToListId(null);
    setNewCardTitle("");
    setNewCardDescription("");

    toast({
      title: "Card created",
      description: `"${newCardTitle}" card has been added successfully.`,
    });
  };

  if (!boardData) {
    return <div className="p-6">Loading board...</div>;
  }

  return (
    <div className="h-full">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Board: {id}</h1>
        <Button variant="outline" onClick={() => setIsAddListDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add List
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="LIST">
          {(provided) => (
            <div
              className="flex overflow-x-auto pb-4 space-x-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {boardData.lists.map((list, index) => (
                <Draggable key={list.id} draggableId={list.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="kanban-column"
                    >
                      <div 
                        className="flex items-center justify-between mb-3 p-2"
                        {...provided.dragHandleProps}
                      >
                        {editingListId === list.id ? (
                          <div className="flex w-full">
                            <Input
                              value={editedListTitle}
                              onChange={e => setEditedListTitle(e.target.value)}
                              className="mr-2"
                              autoFocus
                              onBlur={saveListEdit}
                              onKeyDown={e => e.key === "Enter" && saveListEdit()}
                            />
                            <Button size="sm" onClick={saveListEdit}>Save</Button>
                          </div>
                        ) : (
                          <>
                            <h3 className="font-medium text-sm">{list.title}</h3>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditList(list.id)}>
                                  Edit List
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteList(list.id)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  Delete List
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </>
                        )}
                      </div>

                      <Droppable droppableId={list.id} type="CARD">
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`min-h-[200px] transition-colors ${
                              snapshot.isDraggingOver ? "bg-muted/80" : ""
                            }`}
                          >
                            {list.cards.map((card, index) => (
                              <Draggable key={card.id} draggableId={card.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      ...provided.draggableProps.style,
                                      opacity: snapshot.isDragging ? "0.8" : "1",
                                    }}
                                  >
                                    <CardComponent card={card} />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                      
                      <Button
                        variant="ghost"
                        className="w-full mt-2 justify-start text-muted-foreground"
                        onClick={() => openAddCardDialog(list.id)}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add a card
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              
              <div className="flex-shrink-0 w-[300px]">
                <Button
                  variant="outline"
                  className="w-full h-12 border-dashed"
                  onClick={() => setIsAddListDialogOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add another list
                </Button>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Add List Dialog */}
      <Dialog open={isAddListDialogOpen} onOpenChange={setIsAddListDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New List</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="listTitle">List Title</Label>
            <Input
              id="listTitle"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              placeholder="Enter list title"
              className="mt-2"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddListDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleAddList}>
              <Plus className="mr-2 h-4 w-4" />
              Add List
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Card Dialog */}
      <Dialog open={isAddCardDialogOpen} onOpenChange={setIsAddCardDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Card</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="cardTitle">Card Title</Label>
              <Input
                id="cardTitle"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                placeholder="Enter card title"
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardDescription">Description (optional)</Label>
              <Textarea
                id="cardDescription"
                value={newCardDescription}
                onChange={(e) => setNewCardDescription(e.target.value)}
                placeholder="Enter card description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCardDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleAddCard}>
              <Plus className="mr-2 h-4 w-4" />
              Add Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Board;
