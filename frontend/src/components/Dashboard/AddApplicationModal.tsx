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
  selectedCountry: string;
  onCountryFilter: (country: string) => void;
  selectedProgram: string;
  onProgramFilter: (program: string) => void;
  countries: string[];
  programs: string[];
  isLoadingExternal?: boolean;
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
  selectedCountry,
  onCountryFilter,
  selectedProgram,
  onProgramFilter,
  countries,
  programs,
  isLoadingExternal = false,
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
                <div className="space-y-4">
                  {/* Search Input */}
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
                      disabled={isLoadingExternal}
                    >
                      {isLoadingExternal ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search className="h-4 w-4 mr-2" />
                          Search
                        </>
                      )}
                    </Button>
                    {searchQuery && (
                      <Button variant="outline" onClick={onClearSearch}>
                        Clear
                      </Button>
                    )}
                  </div>

                  {/* Advanced Filter Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gray-900">Advanced Filters</h4>
                      <button 
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        onClick={() => {
                          onCountryFilter("all");
                          onProgramFilter("all");
                        }}
                      >
                        Clear All Filters
                      </button>
                    </div>
                    
                    {/* Filter Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Country Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          🌍 Country
                        </label>
                        <select
                          value={selectedCountry}
                          onChange={e => onCountryFilter(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          <option value="all">All Countries</option>
                          {countries.map(country => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Program Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          🎓 Program
                        </label>
                        <select
                          value={selectedProgram}
                          onChange={e => onProgramFilter(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          <option value="all">All Programs</option>
                          {programs.map(program => (
                            <option key={program} value={program}>
                              {program}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Tuition Range Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          💰 Tuition Range
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          <option value="all">All Ranges</option>
                          <option value="free">Free (€0-500/year)</option>
                          <option value="low">Low (€500-5,000/year)</option>
                          <option value="medium">Medium (€5,000-15,000/year)</option>
                          <option value="high">High (€15,000-30,000/year)</option>
                          <option value="premium">Premium (€30,000+/year)</option>
                        </select>
                      </div>

                      {/* Acceptance Rate Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          📊 Acceptance Rate
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          <option value="all">All Rates</option>
                          <option value="very-high">Very High (70%+)</option>
                          <option value="high">High (50-70%)</option>
                          <option value="medium">Medium (20-50%)</option>
                          <option value="low">Low (10-20%)</option>
                          <option value="very-low">Very Low (0-10%)</option>
                        </select>
                      </div>
                    </div>

                    {/* Additional Filters Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Ranking Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          🏆 World Ranking
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          <option value="all">All Rankings</option>
                          <option value="top-10">Top 10</option>
                          <option value="top-50">Top 50</option>
                          <option value="top-100">Top 100</option>
                          <option value="top-200">Top 200</option>
                          <option value="top-500">Top 500</option>
                        </select>
                      </div>

                      {/* Language Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          🗣️ Language
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          <option value="all">All Languages</option>
                          <option value="english">English</option>
                          <option value="german">German</option>
                          <option value="french">French</option>
                          <option value="spanish">Spanish</option>
                          <option value="chinese">Chinese</option>
                          <option value="japanese">Japanese</option>
                        </select>
                      </div>

                      {/* Application Deadline Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          📅 Application Deadline
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          <option value="all">All Deadlines</option>
                          <option value="urgent">Urgent (Within 1 month)</option>
                          <option value="soon">Soon (1-3 months)</option>
                          <option value="moderate">Moderate (3-6 months)</option>
                          <option value="flexible">Flexible (6+ months)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search Results Summary */}
                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-600">
                        {filteredUniversities.length > 0 ? (
                          <span className="font-medium text-green-700">
                            ✅ Found {filteredUniversities.length} universit
                            {filteredUniversities.length === 1 ? "y" : "ies"}
                            {searchQuery && ` for "${searchQuery}"`}
                          </span>
                        ) : (
                          <span className="font-medium text-red-600">
                            ❌ No results found
                            {searchQuery && ` for "${searchQuery}"`}
                          </span>
                        )}
                      </div>
                      
                      {/* Active Filters Display */}
                      {(selectedCountry !== "all" || selectedProgram !== "all") && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Active filters:</span>
                          {selectedCountry !== "all" && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              🌍 {selectedCountry}
                            </span>
                          )}
                          {selectedProgram !== "all" && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              🎓 {selectedProgram}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Total: {filteredUniversities.length} universities available
                      {filteredUniversities.some(uni => uni.id.startsWith('external-') || uni.id.startsWith('api-') || uni.id.startsWith('search-')) && (
                        <span className="ml-2 text-blue-600">
                          (Live data from global university API)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Popular Universities */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              {searchQuery ? `Search Results` : `Universities from Global Database`}
              {isLoadingExternal && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              )}
            </h3>
            
            {isLoadingExternal && filteredUniversities.length === 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-8 bg-gray-200 rounded flex-1"></div>
                        <div className="h-8 bg-gray-200 rounded w-10"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
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
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            #{university.ranking}
                          </Badge>
                          {(university.id.startsWith('external-') || university.id.startsWith('api-') || university.id.startsWith('search-')) && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                              🌍 API Data
                            </Badge>
                          )}
                        </div>
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
            )}
            
            {!isLoadingExternal && filteredUniversities.length === 0 && (
              <div className="text-center py-12">
                <div className="mb-4">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🏫</span>
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">No Universities Found</h4>
                <p className="text-gray-600 mb-4">
                  {searchQuery 
                    ? `No universities found for "${searchQuery}". Try a different search term.`
                    : "Unable to load universities. Please check your internet connection and try again."
                  }
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Reload Page
                </button>
              </div>
            )}
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
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={() => {
                      onCountryFilter("all");
                      onProgramFilter("all");
                      onSearchChange("");
                    }}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    🌍 Browse All Universities
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
