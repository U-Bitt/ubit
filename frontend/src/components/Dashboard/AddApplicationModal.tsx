import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Plus,
  ExternalLink,
  X,
  Search,
  Globe,
} from "lucide-react";

interface University {
  id: string;
  name: string;
  location: string;
  ranking: number;
  tuition: string;
  acceptance: string;
  deadline: string;
  image: string;
  programs: string[];
}

interface AddApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExternalLink: (url: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
  onClearSearch: () => void;
  showSuggestions: boolean;
  onSuggestionClick: (university: University) => void;
  onHideSuggestions: () => void;
  filteredUniversities: University[];
  onApplyToUniversity: (university: University) => void;
}

export const AddApplicationModal = ({
  isOpen,
  onClose,
  onExternalLink,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onClearSearch,
  showSuggestions,
  onSuggestionClick,
  onHideSuggestions,
  filteredUniversities,
  onApplyToUniversity,
}: AddApplicationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <Plus className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Add New Application</h2>
                <p className="text-lg text-muted-foreground">
                  Start your university application
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-8" onClick={onHideSuggestions}>
          {/* Search Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Search Universities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Search universities by name, location, or program..."
                      value={searchQuery}
                      onChange={e => onSearchChange(e.target.value)}
                      onFocus={() => onSearchChange(searchQuery)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    {/* Search Suggestions Dropdown */}
                    {showSuggestions && searchQuery.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                        {filteredUniversities.length > 0 ? (
                          filteredUniversities.slice(0, 5).map(university => (
                            <div
                              key={university.id}
                              className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                              onClick={() => onSuggestionClick(university)}
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={university.image}
                                  alt={university.name}
                                  className="w-8 h-8 rounded object-cover"
                                  onError={e => {
                                    e.currentTarget.src =
                                      "/placeholder-logo.svg";
                                  }}
                                />
                                <div>
                                  <p className="font-medium text-sm">
                                    {university.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {university.location}
                                  </p>
                                </div>
                                <Badge
                                  variant="outline"
                                  className="ml-auto text-xs"
                                >
                                  #{university.ranking}
                                </Badge>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-gray-500 text-sm">
                            No universities found for &quot;{searchQuery}&quot;
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={onSearchSubmit}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  {searchQuery && (
                    <Button variant="outline" onClick={onClearSearch}>
                      Clear
                    </Button>
                  )}
                </div>

                {/* Search Results Summary */}
                {searchQuery && (
                  <div className="mt-3 text-sm text-gray-600">
                    {filteredUniversities.length > 0 ? (
                      <span>
                        Found {filteredUniversities.length} universit
                        {filteredUniversities.length === 1 ? "y" : "ies"}
                        {searchQuery && ` for &quot;${searchQuery}&quot;`}
                      </span>
                    ) : (
                      <span className="text-red-500">
                        No results found for &quot;{searchQuery}&quot;
                      </span>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Popular Universities */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              {searchQuery ? `Search Results` : `Popular Universities`}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUniversities.map(university => (
                <Card
                  key={university.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={university.image}
                        alt={university.name}
                        className="w-16 h-16 rounded-lg object-cover"
                        onError={e => {
                          e.currentTarget.src = "/placeholder-logo.svg";
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">
                          {university.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {university.location}
                        </p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          #{university.ranking}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tuition:</span>
                        <span className="font-medium">
                          {university.tuition}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Acceptance:
                        </span>
                        <span className="font-medium">
                          {university.acceptance}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Deadline:</span>
                        <span className="font-medium">
                          {university.deadline}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">
                        Popular Programs:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {university.programs
                          .slice(0, 3)
                          .map((program: string, index: number) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {program}
                            </Badge>
                          ))}
                        {university.programs.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{university.programs.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        onClick={() => onApplyToUniversity(university)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Apply Now
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          onExternalLink(
                            `https://www.${university.name.toLowerCase().replace(/\s+/g, "")}.edu`
                          )
                        }
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Can&apos;t find your university?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Browse our complete database of 2,500+ universities
                    worldwide
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Browse All Universities
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Custom University
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
