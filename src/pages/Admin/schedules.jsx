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
import { Calendar, Plus, Search } from "lucide-react";

const schedules = [
  {
    id: 1,
    name: "Weekend Getaway",
    startDate: "2023-06-15",
    endDate: "2023-06-17",
    destination: "Da Nang",
    memberNumber: 4,
    status: "upcoming",
  },
  {
    id: 2,
    name: "Family Vacation",
    startDate: "2023-07-01",
    endDate: "2023-07-07",
    destination: "Phu Quoc Island",
    memberNumber: 6,
    status: "upcoming",
  },
  {
    id: 3,
    name: "Business Trip",
    startDate: "2023-05-10",
    endDate: "2023-05-12",
    destination: "Ho Chi Minh City",
    memberNumber: 2,
    status: "completed",
  },
  {
    id: 4,
    name: "Honeymoon",
    startDate: "2023-08-20",
    endDate: "2023-08-27",
    destination: "Nha Trang",
    memberNumber: 2,
    status: "upcoming",
  },
  {
    id: 5,
    name: "Solo Adventure",
    startDate: "2023-06-05",
    endDate: "2023-06-10",
    destination: "Sapa",
    memberNumber: 1,
    status: "upcoming",
  },
  {
    id: 6,
    name: "Group Tour",
    startDate: "2023-04-15",
    endDate: "2023-04-20",
    destination: "Hue",
    memberNumber: 12,
    status: "completed",
  },
];

export default function SchedulesPage() {
  return (
    <>
      <div>
        <Card>
          <div className="flex items-center justify-between">
            <CardHeader>
              <CardTitle>Manage Schedules</CardTitle>
            </CardHeader>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Schedule
            </Button>
          </div>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search schedules..."
                  className="w-full pl-8"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Date Range
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
                    <TableHead>Name</TableHead>
                    <TableHead>Date Range</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium">
                        {schedule.name}
                      </TableCell>
                      <TableCell>
                        {schedule.startDate} to {schedule.endDate}
                      </TableCell>
                      <TableCell>{schedule.destination}</TableCell>
                      <TableCell>{schedule.memberNumber}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            schedule.status === "upcoming"
                              ? "default"
                              : schedule.status === "completed"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {schedule.status}
                        </Badge>
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
