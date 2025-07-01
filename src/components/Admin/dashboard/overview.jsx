"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    businesses: 40,
    users: 120,
  },
  {
    name: "Feb",
    businesses: 45,
    users: 150,
  },
  {
    name: "Mar",
    businesses: 55,
    users: 180,
  },
  {
    name: "Apr",
    businesses: 65,
    users: 220,
  },
  {
    name: "May",
    businesses: 90,
    users: 270,
  },
  {
    name: "Jun",
    businesses: 110,
    users: 320,
  },
  {
    name: "Jul",
    businesses: 120,
    users: 370,
  },
  {
    name: "Aug",
    businesses: 130,
    users: 420,
  },
  {
    name: "Sep",
    businesses: 140,
    users: 450,
  },
  {
    name: "Oct",
    businesses: 160,
    users: 500,
  },
  {
    name: "Nov",
    businesses: 190,
    users: 520,
  },
  {
    name: "Dec",
    businesses: 245,
    users: 580,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="businesses" name="Businesses" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="users" name="Users" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
