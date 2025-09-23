import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash2, Eye, Award, TrendingUp } from 'lucide-react';
import { testScoreApi } from '@/utils/api';
import { useUser } from '@/contexts/UserContext';

interface TestScore {
  id: string;
  testName: string;
  score: string;
  date: string;
  maxScore?: string;
  percentile?: number;
}

const TEST_TYPES = [
  'SAT',
  'ACT',
  'TOEFL',
  'IELTS',
  'GRE',
  'GMAT',
  'MCAT',
  'LSAT',
  'AP Exam',
  'IB Exam',
  'A-Level',
  'Other'
];

const SCORE_COLORS = {
  excellent: 'bg-green-100 text-green-800',
  good: 'bg-blue-100 text-blue-800',
  average: 'bg-yellow-100 text-yellow-800',
  below: 'bg-red-100 text-red-800',
};

export const TestScoreManager: React.FC = () => {
  const { user } = useUser();
  const [testScores, setTestScores] = useState<TestScore[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTestScore, setEditingTestScore] = useState<TestScore | null>(null);
  const [previewTestScore, setPreviewTestScore] = useState<TestScore | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    testName: '',
    score: '',
    date: '',
    maxScore: '',
    percentile: '',
  });

  useEffect(() => {
    if (user?.id) {
      loadTestScores();
    }
  }, [user?.id]);

  const loadTestScores = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await testScoreApi.getAll(user.id);
      // Ensure data is always an array
      const testScoresArray = Array.isArray(data) ? data : [];
      setTestScores(testScoresArray as TestScore[]);
    } catch (err) {
      console.error('Error loading test scores:', err);
      setError('Failed to load test scores');
      setTestScores([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleAddTestScore = async () => {
    if (!user?.id) return;
    
    try {
      setError(null);
      const testScoreData = {
        ...formData,
        percentile: formData.percentile ? parseFloat(formData.percentile) : undefined,
      };
      await testScoreApi.create(user.id, testScoreData);
      await loadTestScores();
      setIsAddDialogOpen(false);
      setFormData({ testName: '', score: '', date: '', maxScore: '', percentile: '' });
    } catch (err) {
      console.error('Error adding test score:', err);
      setError('Failed to add test score');
    }
  };

  const handleEditTestScore = async () => {
    if (!user?.id || !editingTestScore) return;
    
    try {
      setError(null);
      const testScoreData = {
        ...formData,
        percentile: formData.percentile ? parseFloat(formData.percentile) : undefined,
      };
      await testScoreApi.update(user.id, editingTestScore.id, testScoreData);
      await loadTestScores();
      setIsEditDialogOpen(false);
      setEditingTestScore(null);
      setFormData({ testName: '', score: '', date: '', maxScore: '', percentile: '' });
    } catch (err) {
      console.error('Error updating test score:', err);
      setError('Failed to update test score');
    }
  };

  const handleDeleteTestScore = async (testScoreId: string) => {
    if (!user?.id) return;
    
    try {
      setError(null);
      await testScoreApi.delete(user.id, testScoreId);
      await loadTestScores();
    } catch (err) {
      console.error('Error deleting test score:', err);
      setError('Failed to delete test score');
    }
  };

  const openEditDialog = (testScore: TestScore) => {
    setEditingTestScore(testScore);
    setFormData({
      testName: testScore.testName,
      score: testScore.score,
      date: new Date(testScore.date).toISOString().split('T')[0],
      maxScore: testScore.maxScore || '',
      percentile: testScore.percentile?.toString() || '',
    });
    setIsEditDialogOpen(true);
  };

  const openPreviewDialog = (testScore: TestScore) => {
    setPreviewTestScore(testScore);
  };

  const resetForm = () => {
    setFormData({ testName: '', score: '', date: '', maxScore: '', percentile: '' });
    setEditingTestScore(null);
  };

  const getScoreColor = (testName: string, score: string, maxScore?: string) => {
    // This is a simplified scoring system - you can make it more sophisticated
    if (testName.toLowerCase().includes('sat')) {
      const scoreNum = parseInt(score);
      if (scoreNum >= 1400) return 'excellent';
      if (scoreNum >= 1200) return 'good';
      if (scoreNum >= 1000) return 'average';
      return 'below';
    }
    if (testName.toLowerCase().includes('act')) {
      const scoreNum = parseInt(score);
      if (scoreNum >= 30) return 'excellent';
      if (scoreNum >= 25) return 'good';
      if (scoreNum >= 20) return 'average';
      return 'below';
    }
    return 'average';
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
        <h2 className="text-2xl font-bold">Test Scores</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Test Score
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Test Score</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="testName">Test Name</Label>
                <Select value={formData.testName} onValueChange={(value) => setFormData({ ...formData, testName: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select test type" />
                  </SelectTrigger>
                  <SelectContent>
                    {TEST_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="score">Score</Label>
                  <Input
                    id="score"
                    value={formData.score}
                    onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                    placeholder="e.g., 1500"
                  />
                </div>
                <div>
                  <Label htmlFor="maxScore">Max Score (Optional)</Label>
                  <Input
                    id="maxScore"
                    value={formData.maxScore}
                    onChange={(e) => setFormData({ ...formData, maxScore: e.target.value })}
                    placeholder="e.g., 1600"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Test Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="percentile">Percentile (Optional)</Label>
                  <Input
                    id="percentile"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.percentile}
                    onChange={(e) => setFormData({ ...formData, percentile: e.target.value })}
                    placeholder="e.g., 95"
                  />
                </div>
              </div>
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTestScore}>
                  Add Test Score
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

      {testScores.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Award className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No test scores yet</h3>
            <p className="text-gray-500 text-center mb-4">
              Add your standardized test scores like SAT, ACT, TOEFL, and more.
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Test Score
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(testScores) && testScores.map((testScore) => {
            const scoreColor = getScoreColor(testScore.testName, testScore.score, testScore.maxScore);
            return (
              <Card key={testScore.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-medium">
                        {testScore.testName}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-2xl font-bold text-blue-600">
                          {testScore.score}
                        </span>
                        {testScore.maxScore && (
                          <span className="text-sm text-gray-500">
                            / {testScore.maxScore}
                          </span>
                        )}
                      </div>
                    </div>
                    <Badge className={SCORE_COLORS[scoreColor]}>
                      {scoreColor}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <p>Date: {new Date(testScore.date).toLocaleDateString()}</p>
                      {testScore.percentile && (
                        <p>Percentile: {testScore.percentile}%</p>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openPreviewDialog(testScore)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(testScore)}
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
                            <AlertDialogTitle>Delete Test Score</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this {testScore.testName} score? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteTestScore(testScore.id)}
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
            );
          })}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Test Score</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-testName">Test Name</Label>
              <Select value={formData.testName} onValueChange={(value) => setFormData({ ...formData, testName: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select test type" />
                </SelectTrigger>
                <SelectContent>
                  {TEST_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-score">Score</Label>
                <Input
                  id="edit-score"
                  value={formData.score}
                  onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                  placeholder="e.g., 1500"
                />
              </div>
              <div>
                <Label htmlFor="edit-maxScore">Max Score (Optional)</Label>
                <Input
                  id="edit-maxScore"
                  value={formData.maxScore}
                  onChange={(e) => setFormData({ ...formData, maxScore: e.target.value })}
                  placeholder="e.g., 1600"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-date">Test Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-percentile">Percentile (Optional)</Label>
                <Input
                  id="edit-percentile"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.percentile}
                  onChange={(e) => setFormData({ ...formData, percentile: e.target.value })}
                  placeholder="e.g., 95"
                />
              </div>
            </div>
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditTestScore}>
                Update Test Score
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={!!previewTestScore} onOpenChange={() => setPreviewTestScore(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Test Score Details</DialogTitle>
          </DialogHeader>
          {previewTestScore && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {previewTestScore.score}
                  {previewTestScore.maxScore && (
                    <span className="text-lg text-gray-500"> / {previewTestScore.maxScore}</span>
                  )}
                </div>
                <h3 className="text-xl font-semibold">{previewTestScore.testName}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Test Date</Label>
                  <p className="text-sm text-gray-600">
                    {new Date(previewTestScore.date).toLocaleDateString()}
                  </p>
                </div>
                {previewTestScore.percentile && (
                  <div>
                    <Label className="text-sm font-medium">Percentile</Label>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-600">{previewTestScore.percentile}%</p>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Score Analysis</h4>
                <p className="text-sm text-gray-600">
                  This score places you in the {previewTestScore.percentile || 'N/A'}th percentile 
                  for {previewTestScore.testName} test takers.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};