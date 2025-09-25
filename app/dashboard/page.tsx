"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Star,
  Clock,
  ChevronRight,
  ChevronLeft,
  LogOut,
  Settings,
  Play,
  ArrowLeft,
  BookMarked,
  Loader2,
  Library,
  LayoutGrid,
  Menu,
  X,
  Home,
  User,
  BookOpen,
  Image as ImageIcon,
  Heart,
  Mail,
} from "lucide-react"
import Logo from "@/components/Logo"

// --- INTERFACES ---
interface Subject { id: number; name: string; thumbnail: string; }
interface Course { id: number; name: string; status: string; thumbnail: string; created_at: string; price: number; author: string; class_id: number; subject_id: number; view_count: number; practicle_video_clips?: any[]; subject?: Subject; payment?: object; }
interface ApiResponse<T> { status: string; message: string; data: T; }

// --- STATIC DATA & MAPPINGS ---
const classCategories = [
  { label: "I", id: 1 }, { label: "II", id: 2 }, { label: "III", id: 3 },
  { label: "IV", id: 4 }, { label: "V", id: 5 }, { label: "VI", id: 6 },
  { label: "Swahili Courses For Foreigners", id: 9, className: "col-span-3 md:col-span-1" },
  { label: "English Courses", id: 7, className: "col-span-3 md:col-span-1" },
  { label: "How to pay", id: 8, className: "col-span-3 md:col-span-1" },
]

const classIdToLabelMap = new Map(classCategories.map(c => [c.id, c.label]))
const COURSES_PER_PAGE = 8;

// --- MAIN COMPONENT ---
export default function DashboardPage() {
  // --- STATE MANAGEMENT ---
  const [activeView, setActiveView] = useState<'all' | 'my'>('all');
  const [initialCourses, setInitialCourses] = useState<Course[]>([])
  const [myCourses, setMyCourses] = useState<Course[]>([])
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>([])
  const [pageLoading, setPageLoading] = useState(true)
  const [myCoursesLoading, setMyCoursesLoading] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [user, setUser] = useState<any>(null)
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null)
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [subjectsLoading, setSubjectsLoading] = useState(false)
  const [subjectsError, setSubjectsError] = useState<string | null>(null)
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter()

  // --- EFFECTS ---
  useEffect(() => { setCurrentPage(0) }, [searchQuery, activeView, displayedCourses])

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if (!token) { router.push("/login"); return; }
    const userDataString = localStorage.getItem('user_data');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUser({ name: userData.name, avatar: "/placeholder-user.jpg" })
    }
    fetchInitialCourses();
    fetchMyCourses();
  }, [router])

  // --- DATA FETCHING ---
  const fetchMyCourses = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    setMyCoursesLoading(true);
    try {
        const response = await fetch("https://portal.kasome.com/api/users/videos", { headers: { 'Authorization': `Bearer ${token}` } });
        const data: ApiResponse<Course[]> = await response.json();
        if (data.status === "SUCCESS") {
            setMyCourses(data.data);
        }
    } catch (err) {
        console.error("Failed to fetch My Courses:", err);
    } finally {
        setMyCoursesLoading(false);
    }
  }

  const fetchInitialCourses = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) { setError("Authentication required."); setPageLoading(false); return; }
    setPageLoading(true);
    try {
      const response = await fetch("https://portal.kasome.com/api/users/courses", { headers: { 'Authorization': `Bearer ${token}` } })
      const data: ApiResponse<Course[]> = await response.json()
      if (data.status === "SUCCESS") {
        setInitialCourses(data.data)
        setDisplayedCourses(data.data)
      } else { setError("Could not load initial courses.") }
    } catch (err) { setError("Failed to connect to the server.") }
    finally { setPageLoading(false) }
  }

  const fetchSubjects = async (classId: number) => {
    const token = localStorage.getItem("auth_token");
    if (!token) { setSubjectsError("Authentication required."); return; }
    setSubjectsLoading(true); setSubjectsError(null); setSubjects([]);
    try {
      const response = await fetch(`https://portal.kasome.com/api/users/subjects/${classId}`, { headers: { 'Authorization': `Bearer ${token}` } })
      const data: ApiResponse<Course[]> = await response.json()
      if (data.status === "SUCCESS" && data.data) {
        const uniqueSubjects = new Map<number, Subject>()
        data.data.forEach(course => { if (course.subject) uniqueSubjects.set(course.subject.id, course.subject) })
        setSubjects(Array.from(uniqueSubjects.values()))
      } else { setSubjectsError(data.message || "No subjects found.") }
    } catch (err) { setSubjectsError("Failed to connect to the server.") }
    finally { setSubjectsLoading(false) }
  }

  const fetchCoursesForSubject = async (subjectId: number, classId: number) => {
    const token = localStorage.getItem("auth_token");
    if (!token) { setError("Authentication required."); return; }
    setCoursesLoading(true); setDisplayedCourses([]); setError(null);
    try {
      const response = await fetch(`https://portal.kasome.com/api/users/subjects/${subjectId}/class/${classId}`, { headers: { 'Authorization': `Bearer ${token}` } })
      const data: ApiResponse<Course[]> = await response.json();
      if (data.status === "SUCCESS") { setDisplayedCourses(data.data) }
      else { setError(data.message || "Could not load courses for this subject.") }
    } catch (err) { setError("Failed to connect to the server for courses.") }
    finally { setCoursesLoading(false) }
  }

  // --- EVENT HANDLERS ---
  const handleLogout = () => { localStorage.removeItem("auth_token"); localStorage.removeItem("user_data"); router.push("/login"); }
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleSidebarClick = () => { setIsSidebarOpen(false); }

  const resetAllFilters = () => {
    setSelectedClassId(null); setSelectedSubjectId(null);
    setSubjects([]); setSubjectsError(null);
    setDisplayedCourses(initialCourses); setError(null);
  }

  const handleViewChange = (view: 'all' | 'my') => {
      resetAllFilters();
      setActiveView(view);
  }

  const handleSelectClass = (classId: number) => {
    if (selectedClassId === classId) { resetAllFilters(); return; }
    setSelectedClassId(classId); setSelectedSubjectId(null);
    fetchSubjects(classId);
  }

  const handleSelectSubject = (subjectId: number) => {
    if (selectedClassId) {
      setSelectedSubjectId(subjectId);
      fetchCoursesForSubject(subjectId, selectedClassId);
    }
  }

  // --- FILTERING & PAGINATION LOGIC ---
  const listToSearch = activeView === 'all' ? displayedCourses : myCourses;
  const searchFilteredCourses = listToSearch.filter(course => !searchQuery || course.name.toLowerCase().includes(searchQuery.toLowerCase()) || course.author.toLowerCase().includes(searchQuery.toLowerCase()));
  const totalPages = Math.ceil(searchFilteredCourses.length / COURSES_PER_PAGE) || 1;
  const visibleCourses = searchFilteredCourses.slice(currentPage * COURSES_PER_PAGE, (currentPage + 1) * COURSES_PER_PAGE);
  const nextPage = () => { if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1); }
  const prevPage = () => { if (currentPage > 0) setCurrentPage(currentPage - 1); }

  // --- DERIVED STATE FOR UI ---
  const showSubjectsList = activeView === 'all' && selectedClassId && !selectedSubjectId;
  const showAllCoursesList = activeView === 'all' && !showSubjectsList;
  const showMyCoursesList = activeView === 'my';

  // --- RENDER LOGIC & SUB-COMPONENTS ---
  const PaginationControls = () => {
    if (totalPages <= 1) return null;
    return (
        <div className="flex items-center justify-center space-x-4 mt-8">
            <Button variant="outline" size="sm" onClick={prevPage} disabled={currentPage === 0}><ChevronLeft className="h-4 w-4 mr-1" /> Previous</Button>
            <span className="text-sm font-medium text-gray-600">Page {currentPage + 1} of {totalPages}</span>
            <Button variant="outline" size="sm" onClick={nextPage} disabled={currentPage === totalPages - 1}>Next <ChevronRight className="h-4 w-4 ml-1" /></Button>
        </div>
    )
  }

  const CourseCard = ({ course }: { course: Course }) => (
    <Card className="hover:shadow-lg transition-shadow bg-white flex flex-col">
      <CardHeader className="p-0">
        <Link href={`/course/${course.id}`} className="block relative group">
          <img
            src={course.thumbnail?.startsWith("sample-") ? `/placeholder.svg?h=200&w=320&text=${encodeURIComponent(course.name)}` : `https://portal.kasome.com/storage/${course.thumbnail}`}
            alt={course.name}
            className="w-full h-48 object-cover rounded-t-lg"
            onError={(e) => { (e.target as HTMLImageElement).src = `/placeholder.svg?h=200&w=320&text=${encodeURIComponent(course.name)}` }}
          />
          <Badge className="absolute top-2 right-2 bg-white text-black">{course.price === 0 ? "Free" : `TSh ${course.price.toLocaleString()}`}</Badge>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center"><Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" /></div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex flex-col flex-grow">
        <CardTitle className="text-lg mb-2 line-clamp-2 h-14"><Link href={`/course/${course.id}`} className="hover:text-green-700">{course.name}</Link></CardTitle>
        <CardDescription className="text-sm text-gray-600 mb-3">By {course.author}</CardDescription>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center"><Clock className="h-4 w-4 mr-1" /><span>{new Date(course.created_at).toLocaleDateString()}</span></div>
          <div className="flex items-center"><Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" /><span>4.5</span></div>
        </div>
        <div className="mt-auto pt-3"><Link href={`/course/${course.id}`}><Button className="w-full bg-green-600 hover:bg-green-700 text-white">View Course</Button></Link></div>
      </CardContent>
    </Card>
  )

  const ViewSwitcher = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div className="flex border-b-2 border-gray-200">
        <button onClick={() => handleViewChange('all')} className={`flex items-center gap-2 px-4 py-3 font-semibold text-lg transition-colors duration-200 ${activeView === 'all' ? 'border-b-4 border-green-600 text-green-700' : 'text-gray-500 hover:text-green-600'}`}><LayoutGrid className="h-5 w-5" /> All Courses</button>
        <button onClick={() => handleViewChange('my')} className={`flex items-center gap-2 px-4 py-3 font-semibold text-lg transition-colors duration-200 ${activeView === 'my' ? 'border-b-4 border-green-600 text-green-700' : 'text-gray-500 hover:text-green-600'}`}><Library className="h-5 w-5" /> My Courses</button>
      </div>
    </div>
  );

  const MyCoursesList = () => (
    <section className="py-8 pt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {myCoursesLoading ? (
            <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin text-green-600 mx-auto" /></div>
        ) : (
          searchFilteredCourses.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleCourses.map(course => <CourseCard key={course.id} course={course} />)}
              </div>
              <PaginationControls />
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow">
              <p className="text-gray-600 text-lg font-medium">You haven't purchased any courses yet.</p>
              <p className="text-gray-500 mt-2">Browse "All Courses" to get started!</p>
            </div>
          )
        )}
      </div>
    </section>
  )

  const CategorySelector = () => (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Choose your Class</h2>
          <button onClick={resetAllFilters} className="text-sm font-semibold text-yellow-600 hover:text-yellow-700">View All</button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {classCategories.map(({ label, id, className }) => (
            <Button key={id} variant={selectedClassId === id ? "default" : "outline"} onClick={() => handleSelectClass(id)}
              className={`h-12 text-base font-bold transition-transform transform hover:scale-105 ${className || ''} ${selectedClassId === id ? "bg-green-600 hover:bg-green-700 text-white shadow-lg" : "bg-white text-gray-700"}`}>{label}</Button>
          ))}
        </div>
      </div>
    </section>
  )

  const SubjectList = () => (
    <section className="py-8 pt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => resetAllFilters()} title="Back to Class Selection"><ArrowLeft className="h-4 w-4" /></Button>
            <h2 className="text-2xl font-bold">Subjects for {classIdToLabelMap.get(selectedClassId!) || 'Category'}</h2>
          </div>
        </div>
        {subjectsLoading ? <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin text-green-600 mx-auto" /></div> :
          subjectsError ? <div className="text-center py-12 text-red-600 bg-red-50 p-4 rounded-md">{subjectsError}</div> : (
          <div className="space-y-3">
            {subjects.length > 0 ? subjects.map(subject => (
              <Card key={subject.id} className="hover:shadow-lg hover:border-green-500 border-2 border-transparent transition-all cursor-pointer" onClick={() => handleSelectSubject(subject.id)}>
                <CardContent className="p-4 flex items-center gap-4">
                  <Avatar className="h-12 w-12 rounded-md"><AvatarImage src={`https://portal.kasome.com/storage/${subject.thumbnail}`} alt={subject.name} /><AvatarFallback className="bg-gray-200 rounded-md"><BookMarked className="text-gray-500" /></AvatarFallback></Avatar>
                  <span className="text-lg font-medium text-gray-800">{subject.name}</span>
                  <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
                </CardContent>
              </Card>
            )) : <div className="text-center py-12 text-gray-600 bg-gray-50 p-4 rounded-md">No subjects were found for this category.</div>
            }
          </div>
        )}
      </div>
    </section>
  )

  const CourseList = () => (
    <section className="py-8 pt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {selectedSubjectId && <Button variant="outline" size="icon" onClick={() => setSelectedSubjectId(null)} title="Back to Subject Selection"><ArrowLeft className="h-4 w-4" /></Button>}
            <h2 className="text-2xl font-bold">{selectedSubjectId ? `Courses for ${subjects.find(s => s.id === selectedSubjectId)?.name || 'Subject'}` : "All Courses"}</h2>
          </div>
        </div>
        {coursesLoading ? <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin text-green-600 mx-auto" /></div> :
          error ? <div className="text-center py-12 text-red-600 bg-red-50 p-4 rounded-md">{error}</div> : (
          searchFilteredCourses.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleCourses.map(course => <CourseCard key={course.id} course={course} />)}
              </div>
              <PaginationControls />
            </>
          ) : <div className="text-center py-16 bg-white rounded-lg shadow"><p className="text-gray-600 text-lg font-medium">No courses found.</p></div>
        )}
      </div>
    </section>
  )

  if (pageLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Loader2 className="h-16 w-16 animate-spin text-green-600" />
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="p-4 flex items-center justify-between border-b">
              <Logo />
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                  <X className="h-6 w-6" />
              </Button>
          </div>
          <div className="flex flex-col p-4 space-y-2">
              <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-green-700 px-4 py-2 rounded-lg" onClick={handleSidebarClick}><Home className="h-5 w-5" />Home</Link>
              <Link href="/dashboard" className="flex items-center gap-2 text-green-700 font-semibold bg-green-50 px-4 py-2 rounded-lg" onClick={handleSidebarClick}><LayoutGrid className="h-5 w-5" />Dashboard</Link>
              <Link href="/about" className="flex items-center gap-2 text-gray-600 hover:text-green-700 px-4 py-2 rounded-lg" onClick={handleSidebarClick}><User className="h-5 w-5" />About Us</Link>
              <Link href="/books" className="flex items-center gap-2 text-gray-600 hover:text-green-700 px-4 py-2 rounded-lg" onClick={handleSidebarClick}><BookOpen className="h-5 w-5" />Books</Link>
              <Link href="/gallery" className="flex items-center gap-2 text-gray-600 hover:text-green-700 px-4 py-2 rounded-lg" onClick={handleSidebarClick}><ImageIcon className="h-5 w-5" />Gallery</Link>
              <Link href="/donate" className="flex items-center gap-2 text-gray-600 hover:text-green-700 px-4 py-2 rounded-lg" onClick={handleSidebarClick}><Heart className="h-5 w-5" />Donate</Link>
              <Link href="/contact" className="flex items-center gap-2 text-gray-600 hover:text-green-700 px-4 py-2 rounded-lg" onClick={handleSidebarClick}><Mail className="h-5 w-5" />Contact</Link>
          </div>
      </div>

      {/* Overlay to close sidebar when clicking outside */}
      {isSidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={toggleSidebar} />}

      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
              <Logo />
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-green-700">Home</Link>
              <Link href="/dashboard" className="text-green-700 font-semibold border-b-2 border-green-700">Dashboard</Link>
              <Link href="/profile" className="text-gray-600 hover:text-green-700">Profile</Link>
              <Link href="/books" className="text-gray-600 hover:text-green-700">Books</Link>
              <Link href="/gallery" className="text-gray-600 hover:text-green-700">Gallery</Link>
              <Link href="/donate" className="text-gray-600 hover:text-green-700">Donate</Link>
              <Link href="/contact" className="text-gray-600 hover:text-green-700">Contact</Link>
            </nav>
            <div className="flex items-center space-x-4">
              {user && (
                <>
                  <Avatar><AvatarImage src={user.avatar} alt={user.name} /><AvatarFallback>{user.name?.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback></Avatar>
                  <span className="hidden md:block text-sm font-medium">{user.name}</span>
                  <Button variant="ghost" size="sm" onClick={handleLogout}><LogOut className="h-4 w-4" /></Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {user?.name?.split(" ")[0] || "Student"}!</h1>
              <p className="text-xl opacity-90">Continue your learning journey</p>
            </div>
            <div className="mt-6 md:mt-0 grid grid-cols-3 gap-6 text-center">
              <div><div className="text-2xl font-bold">{initialCourses.length}</div><div className="text-sm opacity-75">Total Courses</div></div>
              <div><div className="text-2xl font-bold">{myCourses.length}</div><div className="text-sm opacity-75">My Courses</div></div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input type="text" placeholder="Search for a course..." className="pl-10 pr-4 py-3 w-full text-lg" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>
      </section>
      <ViewSwitcher />
      {activeView === 'all' && (showSubjectsList ? <SubjectList /> : <><CategorySelector /><CourseList /></>)}
      {activeView === 'my' && <MyCoursesList />}

       {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div><Link href="/" className="flex items-center space-x-2"><div className="w-10 h-10 bg-green-0 rounded-lg flex items-center justify-center"><img src="/images/kasomelogo.svg" alt="Kasome Logo" /></div><span className="text-2xl font-bold text-white">Kasome</span></Link><p className="text-gray-400 mt-4">Empowering students across Tanzania with quality online education.</p></div>
                  <div><h3 className="text-lg font-semibold mb-4">Courses</h3><ul className="space-y-2 text-gray-400"><li><Link href="/">Mathematics</Link></li><li><Link href="/courses/science">Science</Link></li><li><Link href="/">Languages</Link></li><li><Link href="/">Technology</Link></li></ul></div>
                  <div><h3 className="text-lg font-semibold mb-4">Support</h3><ul className="space-y-2 text-gray-400"><li><Link href="/contact">Help Center</Link></li><li><Link href="/contact">Contact Us</Link></li><li><Link href="/">FAQ</Link></li><li><Link href="/">Community</Link></li></ul></div>
                  <div><h3 className="text-lg font-semibold mb-4">Company</h3><ul className="space-y-2 text-gray-400"><li><Link href="/about">About Us</Link></li><li><Link href="/">Careers</Link></li><li><Link href="/">Privacy Policy</Link></li><li><Link href="/">Terms of Service</Link></li></ul></div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400"><p>&copy; {new Date().getFullYear()} Kasome. All rights reserved.</p></div>
              </div>
            </footer>
    </div>
  )
}