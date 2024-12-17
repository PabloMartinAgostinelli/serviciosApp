import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProviderList({ providers }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {providers.map((provider) => (
        <Card key={provider.id}>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold">{provider.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{provider.category}</p>
            <div className="mt-2">
              <span className="text-yellow-500">★</span>
              <span className="ml-1">{provider.rating.toFixed(1)}</span>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                ({provider.reviews} reseñas)
              </span>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 dark:bg-gray-800 p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {provider.contacts} contactos
            </p>
            <Button className="ml-auto">Contactar</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

