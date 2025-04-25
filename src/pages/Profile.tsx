
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCog } from "lucide-react";

export default function Profile() {
  return (
    <div className="container mx-auto max-w-4xl py-6">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>
                <UserCog className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>John Doe</CardTitle>
              <CardDescription>john.doe@example.com</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Button>Update Profile Picture</Button>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Account Settings</h3>
              <div className="grid gap-2">
                <Button variant="outline">Change Password</Button>
                <Button variant="outline">Update Email</Button>
                <Button variant="outline">Notification Preferences</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
