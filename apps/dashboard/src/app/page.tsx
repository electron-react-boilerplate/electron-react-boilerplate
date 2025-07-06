"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@die-macht-zentrale/ui/components/sidebar";
import { Button } from "@die-macht-zentrale/ui/components/button";
import { Separator } from "@die-macht-zentrale/ui/components/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@die-macht-zentrale/ui/components/collapsible";
import { 
  ChevronRight, 
  Home, 
  Settings, 
  Users, 
  FileText, 
  Database, 
  BarChart3,
  Folder,
  FolderOpen,
  File,
  Rss
} from "lucide-react";

export default function Dashboard() {
  const [openFolders, setOpenFolders] = useState<string[]>([]);

  const toggleFolder = (folderId: string) => {
    setOpenFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const treeData = [
    {
      id: "projects",
      label: "Projects",
      icon: Folder,
      children: [
        { id: "project1", label: "Project Alpha", icon: File },
        { id: "project2", label: "Project Beta", icon: File },
        { id: "project3", label: "Project Gamma", icon: File },
      ]
    },
    {
      id: "documents",
      label: "Documents",
      icon: Folder,
      children: [
        { id: "doc1", label: "Requirements.md", icon: FileText },
        { id: "doc2", label: "Architecture.md", icon: FileText },
        { id: "doc3", label: "API Specs", icon: FileText },
      ]
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: Folder,
      children: [
        { id: "reports", label: "Reports", icon: BarChart3 },
        { id: "metrics", label: "Metrics", icon: BarChart3 },
      ]
    },
    {
      id: "settings",
      label: "Settings",
      icon: Folder,
      children: [
        { id: "general", label: "General", icon: Settings },
        { id: "users", label: "Users", icon: Users },
        { id: "database", label: "Database", icon: Database },
      ]
    }
  ];

  return (
    <div className="flex h-screen">
      <Sidebar className="border-r">
        <SidebarHeader className="p-4">
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="w-full">
                    <Button variant="default" className="justify-start gap-2">
                      <Rss className="h-4 w-4" />
                      Feed
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <Separator />

          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {treeData.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton 
                          onClick={() => toggleFolder(item.id)}
                          className="w-full justify-between"
                        >
                          <div className="flex items-center gap-2">
                            {openFolders.includes(item.id) ? (
                              <FolderOpen className="h-4 w-4" />
                            ) : (
                              <item.icon className="h-4 w-4" />
                            )}
                            {item.label}
                          </div>
                          <ChevronRight 
                            className={`h-4 w-4 transition-transform ${
                              openFolders.includes(item.id) ? 'rotate-90' : ''
                            }`}
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child.id}>
                              <SidebarMenuSubButton asChild>
                                <a href="#" className="flex items-center gap-2">
                                  <child.icon className="h-4 w-4" />
                                  {child.label}
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Home className="h-4 w-4" />
            <span>Dashboard v1.0</span>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="flex-1">
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-lg font-semibold">Welcome to Dashboard</h1>
        </header>
        
        <main className="flex-1 p-6">
          <div className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium">Total Users</h3>
                </div>
                <p className="text-2xl font-bold mt-2">1,234</p>
                <p className="text-sm text-muted-foreground">+12% from last month</p>
              </div>
              
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  <h3 className="font-medium">Documents</h3>
                </div>
                <p className="text-2xl font-bold mt-2">456</p>
                <p className="text-sm text-muted-foreground">+8% from last month</p>
              </div>
              
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  <h3 className="font-medium">Analytics</h3>
                </div>
                <p className="text-2xl font-bold mt-2">89.2%</p>
                <p className="text-sm text-muted-foreground">+2.1% from last week</p>
              </div>
              
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-orange-600" />
                  <h3 className="font-medium">Storage</h3>
                </div>
                <p className="text-2xl font-bold mt-2">2.4 GB</p>
                <p className="text-sm text-muted-foreground">68% of 3.5 GB used</p>
              </div>
            </div>
            
            <div className="rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  <div>
                    <p className="font-medium">New user registered</p>
                    <p className="text-sm text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                  <div>
                    <p className="font-medium">Document uploaded</p>
                    <p className="text-sm text-muted-foreground">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                  <div>
                    <p className="font-medium">Analytics report generated</p>
                    <p className="text-sm text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  );
}
