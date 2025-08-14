"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Clock, ChevronLeft, ChevronRight, Play, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Course {
  id: string | number;
  name: string;
  author: string;
  thumbnail: string;
  price: number;
  view_count?: number;
  description?: string;
  category?: string;
  currency?: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: Course[];
}

const COURSES_PER_PAGE = 8;

export default function CoursesGrid() {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://portal.kasome.com/api/users/courses");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const apiResponse: ApiResponse = await response.json();
        if (apiResponse.status === "SUCCESS" && Array.isArray(apiResponse.data)) {
          setAllCourses(apiResponse.data);
          setFilteredCourses(apiResponse.data);
        } else {
          setError(apiResponse.message || "No courses found.");
        }
      } catch (err: any) {
        setError(`Failed to load courses: ${err.message || "Unknown error"}.`);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const newFilteredCourses = allCourses.filter(
      (course) =>
        course.name.toLowerCase().includes(lowerCaseQuery) ||
        course.author.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredCourses(newFilteredCourses);
    setCurrentPage(1);
  }, [searchQuery, allCourses]);

  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
  const indexOfLastCourse = currentPage * COURSES_PER_PAGE;
  const indexOfFirstCourse = indexOfLastCourse - COURSES_PER_PAGE;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const goToPage = (pageNumber: number) => { if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber); };
  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);
  
  const handleViewCourseClick = (courseId: string | number) => {
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) {
      router.push(`/register?redirect_to=/course/${courseId}`);
    } else {
      router.push(`/course/${courseId}`);
    }
  };

  const CourseCard = ({ course }: { course: Course }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
       <CardContent className="p-0">
         <Link href={`/course/${course.id}`}>
            <div className="relative aspect-video">
             <Image 
                src={`https://portal.kasome.com/storage/${course.thumbnail}`} 
                alt={course.name} 
                layout="fill" 
                objectFit="cover" 
                onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }} 
             />
            </div>
         </Link>
       </CardContent>
       <div className="p-4 flex flex-col flex-grow">
         <h3 className="font-semibold text-lg mb-2 line-clamp-2 h-14"><Link href={`/course/${course.id}`}>{course.name}</Link></h3>
         <p className="text-sm text-gray-500 mb-4">By {course.author}</p>
         <div className="flex justify-between items-center mt-auto">
            <span className="text-lg font-bold text-green-600">{course.price === 0 ? 'Free' : `TSh ${course.price.toLocaleString()}`}</span>
            <span className="text-sm text-gray-500 flex items-center"><Users className="h-4 w-4 mr-1"/>{course.view_count || 0}</span>
         </div>
       </div>
    </Card>
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <CardContent className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3 mt-4"></div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-600"><p>{error}</p></div>;
  }

  return (
    <div className="space-y-8">
      <div className="max-w-xl mx-auto relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search courses by name or author..."
          className="pl-10 pr-4 py-3 w-full text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Recommended Courses</h2>
        {/* --- TOP PAGINATION CONTROLS RESTORED --- */}
        {totalPages > 1 && (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={prevPage} disabled={currentPage === 1}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-sm text-gray-500">
              {currentPage} / {totalPages}
            </span>
            <Button variant="ghost" size="sm" onClick={nextPage} disabled={currentPage === totalPages}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-12 text-gray-600">
          <p>No courses found matching your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}

      {/* --- BOTTOM PAGINATION CONTROLS --- */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 space-x-2">
            <Button variant="outline" onClick={prevPage} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Previous</span>
            </Button>
            {/* We can add page numbers here if needed in the future */}
            <span className="text-sm font-medium text-gray-700 px-4">
                Page {currentPage} of {totalPages}
            </span>
            <Button variant="outline" onClick={nextPage} disabled={currentPage === totalPages}>
                <span className="mr-2 hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
      )}
    </div>
  );
}