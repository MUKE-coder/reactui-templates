// components/Editor/index.tsx
"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
// import { Button } from "../ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const SimpleEditor = ({ value, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[150px] px-3 py-2 border rounded-md",
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg">
      <div className="flex flex-wrap gap-2 p-2 border-b bg-muted">
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-muted-foreground/20" : ""}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          type="button"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-muted-foreground/20" : ""}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          type="button"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "bg-muted-foreground/20" : ""}
        >
          <Strikethrough className="w-4 h-4" />
        </Button>
        <div className="w-px h-4 bg-border my-auto" />
        <Button
          variant="ghost"
          type="button"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList") ? "bg-muted-foreground/20" : ""
          }
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          type="button"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList") ? "bg-muted-foreground/20" : ""
          }
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          type="button"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive("blockquote") ? "bg-muted-foreground/20" : ""
          }
        >
          <Quote className="w-4 h-4" />
        </Button>
        <div className="w-px h-4 bg-border my-auto" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo className="w-4 h-4" />
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default SimpleEditor;

// USAGE

// function DescriptionCard({ item }: { item: Course }) {
//   const [description, setDescription] = useState(item.description || "");

//   const [isUpdating, setIsUpdating] = useState(false);

//   const handleUpdate = async () => {
//     setIsUpdating(true);

//     try {
//       const data = {
//         description: description,
//       };
//       // console.log(data);
//       await updateCourseById(item.id, data);
//       toast.success("Course Tags updated successfully");
//     } catch (error) {
//       toast.error("Failed to update Course tags");
//       console.error(error);
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Course Description</CardTitle>
//       </CardHeader>
//       <CardContent className="grid gap-6">
//         <div className="grid gap-3">
//           <Editor
//             value={description}
//             onChange={(value) => setDescription(value)}
//           />
//           <p className="text-xs text-muted-foreground">
//             Enter Course description
//           </p>
//         </div>
//       </CardContent>
//       <CardFooter>
//         <Button onClick={handleUpdate} disabled={isUpdating}>
//           {isUpdating ? "Updating..." : "Update Course description"}
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
