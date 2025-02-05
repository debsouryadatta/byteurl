'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { useAuth } from '@clerk/nextjs';
import { Url } from '@prisma/client';
import { UrlCard } from './url-card';
import { nanoid } from 'nanoid';
import { createPageContentAndSummaryAction, createShortUrlAction, deleteShortUrlAction, fetchUserShortenedUrlsAction, updateUrlAction } from '@/lib/actions';
import { Card, CardContent } from './ui/card';
import { LogIn, Link2 } from 'lucide-react';

export function UrlShortener() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedUrls, setShortenedUrls] = useState<Url[]>([]);
  const [summaryLoading, setSummaryLoading] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }
    if (!isLoaded || !isSignedIn) {
      toast.error('Please sign in to shorten a URL');
      return;
    }
    try {
      const newUrl = await createShortUrlAction(url);
      setShortenedUrls((prev) => [newUrl, ...prev]);
      toast.success('URL shortened successfully!');
    } catch (error) {
      console.log("Error shortening URL:", error);
      toast.error('Error shortening URL');
    } finally {
      setUrl('');
      setIsLoading(false);
    }
  };

  const startEditing = (url: Url) => {
    setEditingName(url.id);
    setNewName(url.name || url.shortUrl);
  };

  const handleNameUpdate = async (id: string, name: string) => {
    try {
      if (!name.trim()) {
        toast.error('Name cannot be empty');
        return;
      }
      await updateUrlAction(id, { name: name.trim() });
      setShortenedUrls(prev => prev.map(url => 
        url.id === id ? { ...url, name: name.trim(), updatedAt: new Date() } : url
      ));
      setEditingName(null);
      toast.success('Name updated successfully!');
    } catch (error) {
      console.log("Error updating name:", error);
      toast.error('Error updating name');
    }
  };

  const handleGenerateSummary = async (urlItem: Url) => {
    if (urlItem.summary) {
      return;
    }
    setSummaryLoading(urlItem.id);
    try {
      const { summary, pageContent } = await createPageContentAndSummaryAction(urlItem.originalUrl, urlItem.id);
      setShortenedUrls(prev => prev.map(url => 
        url.id === urlItem.id ? { ...url, summary, pageContent, updatedAt: new Date() } : url
      ));
      toast.success('Summary generated successfully!');
    } catch (error) {
      console.log("Error generating summary:", error);
      toast.error('Failed to generate summary. Please try again.');
    } finally {
      setSummaryLoading(null);
    }
  };

  const copyToClipboard = async (shortUrl: string) => {
    await navigator.clipboard.writeText(shortUrl);
    toast.success('Copied to clipboard!');
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteShortUrlAction(id);
      setShortenedUrls((prev) => prev.filter((url) => url.id !== id));
      toast.success('URL deleted successfully!');
    } catch (error) {
      console.log("Error deleting URL:", error);
      toast.error('Error deleting URL. Please try again.');
    }
  };

  useEffect(() => {
    const fetchUserShortenedUrls = async () => {
      if (!userId) return;
      const shortenedUrls = await fetchUserShortenedUrlsAction();
      setShortenedUrls(shortenedUrls);
    };

    fetchUserShortenedUrls();
  }, [userId]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="Enter your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Shortening...' : 'Shorten'}
          </Button>
        </div>
      </form>

      <div className="space-y-4">
        {!isSignedIn || !isLoaded ? (
          <Card className="p-8">
            <CardContent className="flex flex-col items-center justify-center space-y-4 text-center">
              <LogIn className="h-12 w-12 text-muted-foreground" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Sign in to Access Your URLs</h3>
                <p className="text-muted-foreground">Create an account or sign in to view and manage your shortened URLs.</p>
              </div>
            </CardContent>
          </Card>
        ) : shortenedUrls.length === 0 ? (
          <Card className="p-8">
            <CardContent className="flex flex-col items-center justify-center space-y-4 text-center">
              <Link2 className="h-12 w-12 text-muted-foreground" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">No Shortened URLs Yet</h3>
                <p className="text-muted-foreground">Enter a URL above to create your first shortened link!</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          shortenedUrls.map((item) => (
            <UrlCard
              key={item.id}
              item={item}
              onDelete={handleDelete}
              onCopy={copyToClipboard}
              onGenerateSummary={handleGenerateSummary}
              onNameUpdate={handleNameUpdate}
              editingName={editingName}
              newName={newName}
              onEditStart={startEditing}
              onNameChange={setNewName}
              summaryLoading={summaryLoading}
            />
          ))
        )}
      </div>
    </div>
  );
}