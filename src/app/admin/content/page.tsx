"use client";

import { useState, useEffect } from "react";
import { MainLayout } from "@/components/main-layout";
import { AdminWrapper } from "@/components/admin-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Save, X, Loader2 } from "lucide-react";
import { ContentItem, contentService } from "@/lib/supabase";

export default function ContentManagementPage() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [newItem, setNewItem] = useState<Omit<ContentItem, "id">>({
    title: "",
    type: "book",
    description: "",
    status: "draft",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Fetch content on component mount
  useEffect(() => {
    fetchContent();
  }, []);

  // Fetch content based on active tab
  const fetchContent = async () => {
    setIsLoading(true);
    try {
      let data: ContentItem[];

      if (activeTab === "all") {
        data = await contentService.getAll();
      } else {
        const type = activeTab === "books"
          ? "book"
          : activeTab === "summaries"
            ? "summary"
            : "business-idea";
        data = await contentService.getByType(type as ContentItem["type"]);
      }

      setContent(data);
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    fetchContent();
  };

  // Handle editing an item
  const handleEdit = (item: ContentItem) => {
    setEditingItem({ ...item });
  };

  // Handle saving edited item
  const handleSaveEdit = async () => {
    if (!editingItem) return;

    setIsSubmitting(true);
    try {
      const updated = await contentService.update(editingItem.id, {
        title: editingItem.title,
        type: editingItem.type,
        description: editingItem.description,
        status: editingItem.status
      });

      if (updated) {
        setContent(content.map(item =>
          item.id === editingItem.id ? updated : item
        ));
      }
      setEditingItem(null);
    } catch (error) {
      console.error("Error updating content:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle deleting an item
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setIsSubmitting(true);
      try {
        const success = await contentService.delete(id);
        if (success) {
          setContent(content.filter(item => item.id !== id));
        }
      } catch (error) {
        console.error("Error deleting content:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Handle adding a new item
  const handleAddItem = async () => {
    if (!newItem.title) return;

    setIsSubmitting(true);
    try {
      const created = await contentService.create(newItem);
      if (created) {
        setContent([created, ...content]);
        setNewItem({
          title: "",
          type: "book",
          description: "",
          status: "draft",
        });
      }
    } catch (error) {
      console.error("Error creating content:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminWrapper>
      <MainLayout>
        <div className="container py-8">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
              <p className="text-muted-foreground mt-2">
                Manage your books, summaries, and business ideas
              </p>
            </div>

            <Tabs defaultValue="all" onValueChange={handleTabChange}>
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="all">All Content</TabsTrigger>
                  <TabsTrigger value="books">Books</TabsTrigger>
                  <TabsTrigger value="summaries">Summaries</TabsTrigger>
                  <TabsTrigger value="business-ideas">Business Ideas</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>All Content</CardTitle>
                    <CardDescription>
                      View and manage all content items
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center items-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="ml-2">Loading content...</span>
                      </div>
                    ) : content.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No content items found.</p>
                        <p className="text-sm mt-1">Create your first content item using the form below.</p>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {content.map(item => (
                          <TableRow key={item.id}>
                            {editingItem && editingItem.id === item.id ? (
                              <>
                                <TableCell>
                                  <Input
                                    value={editingItem.title}
                                    onChange={e => setEditingItem({...editingItem, title: e.target.value})}
                                  />
                                </TableCell>
                                <TableCell>
                                  <select
                                    value={editingItem.type}
                                    onChange={e => setEditingItem({
                                      ...editingItem,
                                      type: e.target.value as ContentItem['type']
                                    })}
                                    className="w-full p-2 rounded-md border border-input bg-transparent"
                                  >
                                    <option value="book">Book</option>
                                    <option value="summary">Summary</option>
                                    <option value="business-idea">Business Idea</option>
                                  </select>
                                </TableCell>
                                <TableCell>
                                  <Textarea
                                    value={editingItem.description}
                                    onChange={e => setEditingItem({...editingItem, description: e.target.value})}
                                    rows={2}
                                  />
                                </TableCell>
                                <TableCell>
                                  <select
                                    value={editingItem.status}
                                    onChange={e => setEditingItem({
                                      ...editingItem,
                                      status: e.target.value as ContentItem['status']
                                    })}
                                    className="w-full p-2 rounded-md border border-input bg-transparent"
                                  >
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                  </select>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button size="sm" onClick={handleSaveEdit} disabled={isSubmitting}>
                                      {isSubmitting ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        <Save className="h-4 w-4" />
                                      )}
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={() => setEditingItem(null)} disabled={isSubmitting}>
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </>
                            ) : (
                              <>
                                <TableCell>{item.title}</TableCell>
                                <TableCell className="capitalize">{item.type.replace('-', ' ')}</TableCell>
                                <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                                <TableCell>
                                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    item.status === 'published'
                                      ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                      : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                  }`}>
                                    {item.status}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button size="sm" variant="outline" onClick={() => handleEdit(item)} disabled={isSubmitting}>
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-destructive"
                                      onClick={() => handleDelete(item.id)}
                                      disabled={isSubmitting}
                                    >
                                      {isSubmitting ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        <Trash2 className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                </TableCell>
                              </>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Add New Content</CardTitle>
                    <CardDescription>
                      Create a new content item
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={newItem.title}
                          onChange={e => setNewItem({...newItem, title: e.target.value})}
                          placeholder="Enter content title"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="type">Type</Label>
                        <select
                          id="type"
                          value={newItem.type}
                          onChange={e => setNewItem({
                            ...newItem,
                            type: e.target.value as ContentItem['type']
                          })}
                          className="w-full p-2 rounded-md border border-input bg-transparent"
                        >
                          <option value="book">Book</option>
                          <option value="summary">Summary</option>
                          <option value="business-idea">Business Idea</option>
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newItem.description}
                          onChange={e => setNewItem({...newItem, description: e.target.value})}
                          placeholder="Enter content description"
                          rows={3}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <select
                          id="status"
                          value={newItem.status}
                          onChange={e => setNewItem({
                            ...newItem,
                            status: e.target.value as ContentItem['status']
                          })}
                          className="w-full p-2 rounded-md border border-input bg-transparent"
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleAddItem} disabled={!newItem.title || isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Content
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="books" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Books</CardTitle>
                    <CardDescription>
                      View and manage book content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center items-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="ml-2">Loading books...</span>
                      </div>
                    ) : content.filter(item => item.type === 'book').length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No books found.</p>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {content.filter(item => item.type === 'book').map(item => (
                          <TableRow key={item.id}>
                            <TableCell>{item.title}</TableCell>
                            <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                item.status === 'published'
                                  ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                  : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                              }`}>
                                {item.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleDelete(item.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="summaries" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Summaries</CardTitle>
                    <CardDescription>
                      View and manage summary content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center items-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="ml-2">Loading summaries...</span>
                      </div>
                    ) : content.filter(item => item.type === 'summary').length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No summaries found.</p>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {content.filter(item => item.type === 'summary').map(item => (
                          <TableRow key={item.id}>
                            <TableCell>{item.title}</TableCell>
                            <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                item.status === 'published'
                                  ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                  : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                              }`}>
                                {item.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleDelete(item.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="business-ideas" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Ideas</CardTitle>
                    <CardDescription>
                      View and manage business idea content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center items-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="ml-2">Loading business ideas...</span>
                      </div>
                    ) : content.filter(item => item.type === 'business-idea').length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No business ideas found.</p>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {content.filter(item => item.type === 'business-idea').map(item => (
                          <TableRow key={item.id}>
                            <TableCell>{item.title}</TableCell>
                            <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                item.status === 'published'
                                  ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                  : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                              }`}>
                                {item.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleDelete(item.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </MainLayout>
    </AdminWrapper>
  );
}
