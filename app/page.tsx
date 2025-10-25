'use client'

import { useState, useEffect } from 'react'

interface Hours {
  day: string
  hours: string
  isToday?: boolean
}

interface LocationInfo {
  address: string
  phone: string
  email: string
}

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const shopHours: Hours[] = [
    { day: 'Monday', hours: '6:00 AM - 8:00 PM' },
    { day: 'Tuesday', hours: '6:00 AM - 8:00 PM' },
    { day: 'Wednesday', hours: '6:00 AM - 8:00 PM' },
    { day: 'Thursday', hours: '6:00 AM - 8:00 PM' },
    { day: 'Friday', hours: '6:00 AM - 9:00 PM' },
    { day: 'Saturday', hours: '7:00 AM - 9:00 PM' },
    { day: 'Sunday', hours: '7:00 AM - 7:00 PM' },
  ]

  const location: LocationInfo = {
    address: '123 Coffee Street, Brewtown, BT 12345',
    phone: '(555) 123-BREW',
    email: 'hello@brewhaven.com'
  }

  const specialties = [
    'Single Origin Pour Overs',
    'Artisan Espresso Drinks',
    'Cold Brew on Tap',
    'House-Made Pastries',
    'Specialty Lattes',
    'Fair Trade Coffee Beans'
  ]

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
      setCurrentTime(timeString)

      // Check if currently open
      const currentDay = now.getDay()
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()
      const currentTimeInMinutes = currentHour * 60 + currentMinute

      let openTime: number, closeTime: number

      switch (currentDay) {
        case 0: // Sunday
          openTime = 7 * 60 // 7:00 AM
          closeTime = 19 * 60 // 7:00 PM
          break
        case 1: case 2: case 3: case 4: // Monday - Thursday
          openTime = 6 * 60 // 6:00 AM
          closeTime = 20 * 60 // 8:00 PM
          break
        case 5: // Friday
          openTime = 6 * 60 // 6:00 AM
          closeTime = 21 * 60 // 9:00 PM
          break
        case 6: // Saturday
          openTime = 7 * 60 // 7:00 AM
          closeTime = 21 * 60 // 9:00 PM
          break
        default:
          openTime = 0
          closeTime = 0
      }

      setIsOpen(currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const getTodayHours = (): Hours => {
    const today = new Date().getDay()
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const todayName = days[today]
    
    const todayHours = shopHours.find(h => h.day === todayName)
    return { ...todayHours!, isToday: true }
  }

  const handleCallClick = () => {
    window.location.href = `tel:${location.phone}`
  }

  const handleEmailClick = () => {
    window.location.href = `mailto:${location.email}`
  }

  const handleDirectionsClick = () => {
    const encodedAddress = encodeURIComponent(location.address)
    window.open(`https://maps.google.com?q=${encodedAddress}`, '_blank')
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="coffee-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 drop-shadow-lg">
              Brew Haven
            </h1>
            <p className="text-xl md:text-3xl font-light mb-8 opacity-90">
              Where Every Cup Tells a Story
            </p>
            <div className="text-lg md:text-xl mb-6">
              <p className="mb-2">Artisan Coffee & Genuine Community</p>
              <div className="flex items-center justify-center space-x-4">
                <span className="text-sm opacity-80">Current Time: {currentTime}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  isOpen 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
                }`}>
                  {isOpen ? 'OPEN NOW' : 'CLOSED'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDirectionsClick}
              className="bg-white text-coffee-brown px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-coffee"
            >
              Get Directions
            </button>
            <button
              onClick={handleCallClick}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-coffee-brown transition-colors"
            >
              Call Now
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-white opacity-10 rounded-full"></div>
      </section>

      {/* Hours Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-coffee-brown mb-4">
              Visit Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;re here to serve you the perfect cup, every day of the week. 
              Come experience the warmth of our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Hours */}
            <div className="bg-cream p-8 rounded-lg shadow-coffee">
              <h3 className="text-2xl font-bold text-coffee-brown mb-6 text-center">
                Store Hours
              </h3>
              <div className="space-y-4">
                {shopHours.map((item) => {
                  const isToday = item.day === getTodayHours().day
                  return (
                    <div
                      key={item.day}
                      className={`flex justify-between items-center py-3 px-4 rounded ${
                        isToday 
                          ? 'bg-coffee-brown text-white font-semibold' 
                          : 'text-dark-roast'
                      }`}
                    >
                      <span className="font-medium">{item.day}</span>
                      <span>{item.hours}</span>
                    </div>
                  )
                })}
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-2">Today we&apos;re</p>
                <p className={`text-lg font-semibold ${
                  isOpen ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isOpen ? 'OPEN' : 'CLOSED'}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {getTodayHours().hours}
                </p>
              </div>
            </div>

            {/* Location & Contact */}
            <div className="space-y-8">
              <div className="bg-coffee-brown text-white p-8 rounded-lg shadow-coffee">
                <h3 className="text-2xl font-bold mb-6">Location & Contact</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Address</h4>
                    <p className="opacity-90">{location.address}</p>
                    <button
                      onClick={handleDirectionsClick}
                      className="mt-2 text-sm bg-white bg-opacity-20 px-3 py-1 rounded hover:bg-opacity-30 transition-colors"
                    >
                      Get Directions →
                    </button>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Phone</h4>
                    <button
                      onClick={handleCallClick}
                      className="opacity-90 hover:opacity-100 underline"
                    >
                      {location.phone}
                    </button>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Email</h4>
                    <button
                      onClick={handleEmailClick}
                      className="opacity-90 hover:opacity-100 underline"
                    >
                      {location.email}
                    </button>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div className="bg-gray-50 p-8 rounded-lg shadow-coffee">
                <h3 className="text-2xl font-bold text-coffee-brown mb-6">
                  Our Specialties
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {specialties.map((specialty, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded-lg text-center text-dark-roast hover:shadow-md transition-shadow"
                    >
                      {specialty}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-roast text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold font-serif mb-4">Brew Haven</h3>
          <p className="text-lg opacity-80 mb-6">Where Every Cup Tells a Story</p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm opacity-70">
            <span>{location.address}</span>
            <span>{location.phone}</span>
            <span>{location.email}</span>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-600 text-xs opacity-50">
            <p>&copy; {new Date().getFullYear()} Brew Haven. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}