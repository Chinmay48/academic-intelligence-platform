import {icons, LayoutDashboard,Bot,BookOpenText,ChartNoAxesCombined,FileQuestionMark,Building2,GraduationCap} from "lucide-react"
export const sidebarItems={
    STUDENT:[
      {label:"Dashboard",path:"/student/dashboard",icon:LayoutDashboard},
      {label:"AI Chat",path:"/student/chat",icon:Bot},
      {label:"Resources",path:"/student/resources",icon:BookOpenText},
      {lable:"Analytics",path:"/student/analytics",icon:ChartNoAxesCombined}
    ],
    FACULTY:[
      {label:"Dashboard",path:"/faculty/dashboard",icon:LayoutDashboard},
      {label:"Upload Resource",path:"/faculty/upload-document",icon:BookOpenText},
      {label:"Upload PYQ",path:"/faculty/upload-pyq",icon:FileQuestionMark},
    ],
    ADMIN:[
      {label:"Dashboard",path:"/admin/dashboard",icon:LayoutDashboard},
      {label:"Departments",path:"/admin/departments",icon:Building2},
      {label:"Subjects",path:"/admin/subjects",icon:BookOpenText},

    ]
  }