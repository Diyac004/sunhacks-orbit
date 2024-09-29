'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plane, Clock, Heart } from "lucide-react"
import { FlightsData } from "@/lib/types"

export function EnhancedFlightDetails({flight}: {flight: FlightsData}) {

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              {flight.airline}
            </Badge>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div className="text-left">
            <p className="text-2xl font-bold">{flight.departure}</p>
            <p className="text-sm text-gray-500">{flight.from}</p>
          </div>
          <div className="flex flex-col items-center">
            <Plane className="text-blue-600 mb-2" />
            <p className="text-xs text-gray-500">{flight.duration}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{flight.arrival}</p>
            <p className="text-sm text-gray-500">{flight.to}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-3xl font-bold text-blue-600">{flight.price}</p>
            <p className="text-xs text-gray-500">per person</p>
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <a target="_blank" href={`https://google.com/search?q=${flight.airline} flight from ${flight.from} to ${flight.to} on ${flight.departure}`}>
            Select Flight
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}