import { Button } from "@/components/ui/button"

export default function CategoryList({ categories }) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold mb-4">Categorías</h2>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="ghost"
          className="w-full justify-start"
        >
          {category.name}
        </Button>
      ))}
    </div>
  )
}

