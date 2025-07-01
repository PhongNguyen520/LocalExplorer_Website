import { Clock, Plus, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/Admin/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/Admin/ui/table";
import { Button } from "../../components/Admin/ui/button";
import { Input } from "../../components/Admin/ui/input";
import { Badge } from "../../components/Admin/ui/badge";

const activities = [
  {
    id: 1,
    timeline: "Morning",
    description: "Street Food Breakfast Tour",
    duration: "2 hours",
    cost: "$25",
    business: "Hanoi Food Tour",
    day: "Day 1",
    type: "Food & Dining",
  },
  {
    id: 2,
    timeline: "Afternoon",
    description: "Historical Sites Walking Tour",
    duration: "3 hours",
    cost: "$30",
    business: "Saigon City Tour",
    day: "Day 2",
    type: "Cultural",
  },
  {
    id: 3,
    timeline: "Evening",
    description: "Night Market Experience",
    duration: "2 hours",
    cost: "$15",
    business: "Hoi An Walking Tour",
    day: "Day 1",
    type: "Shopping",
  },
  {
    id: 4,
    timeline: "Morning",
    description: "Cooking Class",
    duration: "4 hours",
    cost: "$45",
    business: "Hanoi Food Tour",
    day: "Day 2",
    type: "Food & Dining",
  },
  {
    id: 5,
    timeline: "Afternoon",
    description: "Beach Relaxation",
    duration: "3 hours",
    cost: "$20",
    business: "Da Nang Beach Experience",
    day: "Day 3",
    type: "Leisure",
  },
  {
    id: 6,
    timeline: "Evening",
    description: "Sunset Cruise",
    duration: "2 hours",
    cost: "$35",
    business: "Nha Trang Snorkeling",
    day: "Day 2",
    type: "Leisure",
  },
];

export default function ActivitiesPage() {
  return (
    <>
      <div>
        <Card>
          <div className="flex items-center justify-between">
            <CardHeader>
              <CardTitle>Manage Activities</CardTitle>
            </CardHeader>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Activity
            </Button>
          </div>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search activities..."
                  className="w-full pl-8"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Clock className="mr-2 h-4 w-4" />
                  Duration
                </Button>
                <Button variant="outline" size="sm">
                  Filter
                </Button>
              </div>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Business</TableHead>
                    <TableHead>Day</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium">
                        {activity.description}
                      </TableCell>
                      <TableCell>{activity.timeline}</TableCell>
                      <TableCell>{activity.duration}</TableCell>
                      <TableCell>{activity.cost}</TableCell>
                      <TableCell>{activity.business}</TableCell>
                      <TableCell>{activity.day}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{activity.type}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
