'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const categories = [
  "Gasista",
  "Plomero",
  "Electricista",
  "Jardinero",
  "Pintor",
  "Carpintero",
]

const providers = [
  { id: 1, name: "Juan Pérez", category: "Gasista", rating: 4.5, reviews: 28, contacts: 45 },
  { id: 2, name: "María González", category: "Plomero", rating: 4.8, reviews: 35, contacts: 60 },
  { id: 3, name: "Carlos Rodríguez", category: "Electricista", rating: 4.2, reviews: 15, contacts: 30 },
  { id: 4, name: "Ana Martínez", category: "Jardinero", rating: 4.7, reviews: 22, contacts: 40 },
  { id: 5, name: "Luis Sánchez", category: "Pintor", rating: 4.3, reviews: 18, contacts: 35 },
  { id: 6, name: "Elena Torres", category: "Carpintero", rating: 4.6, reviews: 25, contacts: 50 },
]

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Check if dark mode is enabled in local storage
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDarkMode)
  }, [])

  useEffect(() => {
    // Update local storage when dark mode changes
    localStorage.setItem('darkMode', darkMode.toString())
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const filteredProviders = providers.filter(provider => 
    (selectedCategory === "" || provider.category === selectedCategory) &&
    (provider.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}>
      <div className="">
        {/* Navigation */}
        <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu />
            </Button>
            <h1 className="text-xl font-bold">Servicios App</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">Iniciar sesión</Button>
            <Button variant="outline">Registrarse</Button>
            <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun /> : <Moon />}
            </Button>
          </div>
        </nav>

        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className={`w-full md:w-64 bg-gray-200 dark:bg-gray-800 p-4 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
            <h2 className="text-lg font-semibold mb-4">Categorías</h2>
            <div className="space-y-2">
              <Button
                key="all"
                variant={selectedCategory === "" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory("")}
              >
                Todas
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 p-4">
            <div className="mb-4">
              <Input 
                type="text" 
                placeholder="Buscar proveedores..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProviders.length > 0 ? filteredProviders.map((provider) => (
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
              )) : (
                <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                  No se encontraron proveedores que coincidan con tu búsqueda.
                </p>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

