
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

// Mock data
const initialBoards = [
  { id: "1", title: "Product Launch", description: "Q2 product launch tasks and timeline", createdAt: new Date().toISOString() },
  { id: "2", title: "Marketing Campaign", description: "Social media marketing campaign planning", createdAt: new Date().toISOString() },
  { id: "3", title: "Website Redesign", description: "Website redesign project board", createdAt: new Date().toISOString() },
];

const BoardsList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [newBoardDescription, setNewBoardDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [boards, setBoards] = useState(initialBoards);
  const { toast } = useToast();

  const handleCreateBoard = () => {
    if (!newBoardTitle.trim()) {
      toast({
        title: "Board title required",
        description: "Please enter a title for your new board.",
        variant: "destructive",
      });
      return;
    }

    const newBoard = {
      id: Date.now().toString(),
      title: newBoardTitle,
      description: newBoardDescription,
      createdAt: new Date().toISOString(),
    };

    setBoards([newBoard, ...boards]);
    setIsDialogOpen(false);
    setNewBoardTitle("");
    setNewBoardDescription("");
    
    toast({
      title: "Board created",
      description: `"${newBoardTitle}" board has been created successfully.`,
    });
  };

  const filteredBoards = boards.filter(board => 
    board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    board.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Boards</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Board
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search boards..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredBoards.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No boards found. Create your first board!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredBoards.map((board) => (
            <Link to={`/board/${board.id}`} key={board.id} className="block group">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">{board.title}</CardTitle>
                  <CardDescription>{board.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Created {new Date(board.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Board</DialogTitle>
            <DialogDescription>
              Add a new board to organize your tasks.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="board-title">Board Title</Label>
              <Input
                id="board-title"
                placeholder="Enter board title"
                value={newBoardTitle}
                onChange={(e) => setNewBoardTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="board-description">Description (optional)</Label>
              <Input
                id="board-description"
                placeholder="Enter board description"
                value={newBoardDescription}
                onChange={(e) => setNewBoardDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleCreateBoard}>
              <Plus className="mr-2 h-4 w-4" />
              Create Board
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BoardsList;
