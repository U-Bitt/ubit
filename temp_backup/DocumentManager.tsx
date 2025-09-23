import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash2, Eye, FileText, Upload, Download } from 'lucide-react';
import { documentApi } from '@/utils/api';
import { useUser } from '@/contexts/UserContext';

interface Document {
  id: string;
  name: string;
  type: string;
  url?: string;
  uploadedAt: string;
  status: 'draft' | 'uploaded' | 'verified' | 'rejected';
}

const DOCUMENT_TYPES = [
  'Transcript',
  'Diploma',
  'Certificate',
  'Recommendation Letter',
  'Personal Statement',
  'CV/Resume',
  'Passport',
  'Visa',
  'Financial Statement',
  'Other'
];

const STATUS_COLORS = {
  draft: 'bg-gray-100 text-gray-800',
  uploaded: 'bg-blue-100 text-blue-800',
  verified: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export const DocumentManager: React.FC = () => {
  const { user } = useUser();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    url: '',
  });

  useEffect(() => {
    if (user?.id) {
      loadDocuments();
    }
  }, [user?.id]);

  const loadDocuments = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await documentApi.getAll(user.id);
      // Ensure data is always an array
      const documentsArray = Array.isArray(data) ? data : [];
      setDocuments(documentsArray as Document[]);
    } catch (err) {
      console.error('Error loading documents:', err);
      setError('Failed to load documents');
      setDocuments([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleAddDocument = async () => {
    if (!user?.id) return;
    
    try {
      setError(null);
      await documentApi.create(user.id, formData);
      await loadDocuments();
      setIsAddDialogOpen(false);
      setFormData({ name: '', type: '', url: '' });
    } catch (err) {
      console.error('Error adding document:', err);
      setError('Failed to add document');
    }
  };

  const handleEditDocument = async () => {
    if (!user?.id || !editingDocument) return;
    
    try {
      setError(null);
      await documentApi.update(user.id, editingDocument.id, formData);
      await loadDocuments();
      setIsEditDialogOpen(false);
      setEditingDocument(null);
      setFormData({ name: '', type: '', url: '' });
    } catch (err) {
      console.error('Error updating document:', err);
      setError('Failed to update document');
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    if (!user?.id) return;
    
    try {
      setError(null);
      await documentApi.delete(user.id, documentId);
      await loadDocuments();
    } catch (err) {
      console.error('Error deleting document:', err);
      setError('Failed to delete document');
    }
  };

  const openEditDialog = (document: Document) => {
    setEditingDocument(document);
    setFormData({
      name: document.name,
      type: document.type,
      url: document.url || '',
    });
    setIsEditDialogOpen(true);
  };

  const openPreviewDialog = (document: Document) => {
    setPreviewDocument(document);
  };

  const resetForm = () => {
    setFormData({ name: '', type: '', url: '' });
    setEditingDocument(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Documents</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Document Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., High School Transcript"
                />
              </div>
              <div>
                <Label htmlFor="type">Document Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {DOCUMENT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="url">Document URL (Optional)</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com/document.pdf"
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddDocument}>
                  Add Document
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {documents.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
            <p className="text-gray-500 text-center mb-4">
              Add your academic documents, certificates, and other important files.
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Document
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(documents) && documents.map((document) => (
            <Card key={document.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-medium truncate">
                      {document.name}
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1">{document.type}</p>
                  </div>
                  <Badge className={STATUS_COLORS[document.status]}>
                    {document.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <p>Uploaded: {new Date(document.uploadedAt).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openPreviewDialog(document)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditDialog(document)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Document</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{document.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteDocument(document.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Document Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., High School Transcript"
              />
            </div>
            <div>
              <Label htmlFor="edit-type">Document Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {DOCUMENT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-url">Document URL (Optional)</Label>
              <Input
                id="edit-url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://example.com/document.pdf"
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditDocument}>
                Update Document
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={!!previewDocument} onOpenChange={() => setPreviewDocument(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Document Preview</DialogTitle>
          </DialogHeader>
          {previewDocument && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Name</Label>
                  <p className="text-sm text-gray-600">{previewDocument.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Type</Label>
                  <p className="text-sm text-gray-600">{previewDocument.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge className={STATUS_COLORS[previewDocument.status]}>
                    {previewDocument.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Uploaded</Label>
                  <p className="text-sm text-gray-600">
                    {new Date(previewDocument.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              {previewDocument.url && (
                <div>
                  <Label className="text-sm font-medium">Document URL</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      value={previewDocument.url}
                      readOnly
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      onClick={() => window.open(previewDocument.url, '_blank')}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};