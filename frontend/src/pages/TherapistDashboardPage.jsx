import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
  Calendar, Clock, Plus, Trash2, LogOut, User, 
  CheckCircle, XCircle, ChevronLeft, ChevronRight,
  Users, Video, Settings, Bell
} from 'lucide-react';
import { toast } from '../hooks/use-toast';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const TherapistDashboardPage = () => {
  const { user, logout, getAuthHeader, isTherapist, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('calendar');
  const [currentWeek, setCurrentWeek] = useState(new Date());
  
  // New slot form
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [newSlot, setNewSlot] = useState({
    date: '',
    start_time: '09:00',
    end_time: '10:00'
  });

  // Profile form
  const [profileForm, setProfileForm] = useState({
    specialization: '',
    bio: '',
    experience_years: 0,
    skills: [],
    image_url: ''
  });
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    if (!authLoading && !isTherapist()) {
      navigate('/therapist/login');
    }
  }, [authLoading, isTherapist, navigate]);

  useEffect(() => {
    if (user && isTherapist()) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const headers = getAuthHeader();
      
      // Fetch profile
      try {
        const profileRes = await axios.get(`${API_URL}/api/therapist/profile`, { headers });
        setProfile(profileRes.data);
        setProfileForm({
          specialization: profileRes.data.specialization || '',
          bio: profileRes.data.bio || '',
          experience_years: profileRes.data.experience_years || 0,
          skills: profileRes.data.skills || [],
          image_url: profileRes.data.image_url || ''
        });
      } catch (err) {
        // Profile might not exist yet
        console.log('Profile not found, will create on save');
      }
      
      // Fetch availability
      try {
        const slotsRes = await axios.get(`${API_URL}/api/therapist/availability`, { headers });
        setSlots(slotsRes.data);
      } catch (err) {
        console.log('No slots yet');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/therapist/login');
  };

  const handleAddSlot = async (e) => {
    e.preventDefault();
    try {
      const headers = getAuthHeader();
      await axios.post(`${API_URL}/api/therapist/availability`, newSlot, { headers });
      toast({ title: "Availability slot added!" });
      setShowAddSlot(false);
      setNewSlot({ date: '', start_time: '09:00', end_time: '10:00' });
      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to add slot",
        variant: "destructive"
      });
    }
  };

  const handleDeleteSlot = async (slotId) => {
    if (!window.confirm('Delete this availability slot?')) return;
    
    try {
      const headers = getAuthHeader();
      await axios.delete(`${API_URL}/api/therapist/availability/${slotId}`, { headers });
      toast({ title: "Slot deleted" });
      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to delete slot",
        variant: "destructive"
      });
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const headers = getAuthHeader();
      await axios.put(`${API_URL}/api/therapist/profile`, profileForm, { headers });
      toast({ title: "Profile updated!" });
      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to update profile",
        variant: "destructive"
      });
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !profileForm.skills.includes(skillInput.trim())) {
      setProfileForm({
        ...profileForm,
        skills: [...profileForm.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skill) => {
    setProfileForm({
      ...profileForm,
      skills: profileForm.skills.filter(s => s !== skill)
    });
  };

  // Generate week days
  const getWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(currentWeek);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays();

  const getSlotsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return slots.filter(slot => slot.date === dateStr);
  };

  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="https://customer-assets.emergentagent.com/job_294a8bf0-85ca-41ba-993d-fcdbbbb03ad2/artifacts/3env23ej_logo.gif" 
                alt="Aashwashan" 
                className="h-10"
              />
              <span className="text-xl font-bold text-teal-600">Therapist Portal</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-medium text-gray-800">{user?.name}</p>
              <p className="text-sm text-gray-500">Therapist</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'calendar' 
                ? 'bg-teal-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Availability</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'profile' 
                ? 'bg-teal-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
        </div>

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            {/* Week Navigation */}
            <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
              <button
                onClick={() => {
                  const prev = new Date(currentWeek);
                  prev.setDate(prev.getDate() - 7);
                  setCurrentWeek(prev);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold text-gray-800">
                {weekDays[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {weekDays[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </h2>
              <button
                onClick={() => {
                  const next = new Date(currentWeek);
                  next.setDate(next.getDate() + 7);
                  setCurrentWeek(next);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Add Slot Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowAddSlot(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
                data-testid="add-slot-btn"
              >
                <Plus className="w-5 h-5" />
                <span>Add Availability</span>
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="grid grid-cols-8 border-b">
                <div className="p-3 bg-gray-50 font-medium text-gray-600 text-sm">Time</div>
                {weekDays.map((day, i) => (
                  <div key={i} className={`p-3 text-center border-l ${
                    day.toDateString() === new Date().toDateString() ? 'bg-teal-50' : 'bg-gray-50'
                  }`}>
                    <p className="text-xs text-gray-500">{day.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                    <p className={`font-semibold ${
                      day.toDateString() === new Date().toDateString() ? 'text-teal-600' : 'text-gray-800'
                    }`}>{day.getDate()}</p>
                  </div>
                ))}
              </div>
              
              {timeSlots.map((time) => (
                <div key={time} className="grid grid-cols-8 border-b last:border-b-0">
                  <div className="p-3 bg-gray-50 text-sm text-gray-600 font-medium">
                    {time}
                  </div>
                  {weekDays.map((day, i) => {
                    const dateStr = day.toISOString().split('T')[0];
                    const slot = slots.find(s => s.date === dateStr && s.start_time === time);
                    const isPast = day < new Date() && day.toDateString() !== new Date().toDateString();
                    
                    return (
                      <div key={i} className={`p-2 border-l min-h-[60px] ${isPast ? 'bg-gray-100' : ''}`}>
                        {slot && (
                          <div className={`rounded-lg p-2 text-xs ${
                            slot.is_booked 
                              ? 'bg-orange-100 text-orange-700 border border-orange-200' 
                              : 'bg-teal-100 text-teal-700 border border-teal-200'
                          }`}>
                            <div className="flex items-center justify-between">
                              <span className="font-medium">
                                {slot.is_booked ? 'Booked' : 'Available'}
                              </span>
                              {!slot.is_booked && (
                                <button
                                  onClick={() => handleDeleteSlot(slot.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                            <p className="text-xs opacity-75">{slot.start_time} - {slot.end_time}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-teal-100 border border-teal-200 rounded"></div>
                <span className="text-gray-600">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-100 border border-orange-200 rounded"></div>
                <span className="text-gray-600">Booked</span>
              </div>
            </div>

            {/* Add Slot Modal */}
            {showAddSlot && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-6">
                  <h3 className="text-xl font-semibold mb-4">Add Availability Slot</h3>
                  <form onSubmit={handleAddSlot} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Date *</label>
                      <input
                        type="date"
                        value={newSlot.date}
                        onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                        data-testid="slot-date-input"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Start Time *</label>
                        <select
                          value={newSlot.start_time}
                          onChange={(e) => setNewSlot({ ...newSlot, start_time: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                        >
                          {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">End Time *</label>
                        <select
                          value={newSlot.end_time}
                          onChange={(e) => setNewSlot({ ...newSlot, end_time: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                        >
                          {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowAddSlot(false)}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:shadow-lg"
                        data-testid="save-slot-btn"
                      >
                        Add Slot
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Your Profile</h3>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Specialization</label>
                  <input
                    type="text"
                    value={profileForm.specialization}
                    onChange={(e) => setProfileForm({ ...profileForm, specialization: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                    placeholder="e.g., Anxiety & Depression"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    rows="4"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500 resize-none"
                    placeholder="Tell clients about yourself..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Years of Experience</label>
                  <input
                    type="number"
                    value={profileForm.experience_years}
                    onChange={(e) => setProfileForm({ ...profileForm, experience_years: parseInt(e.target.value) || 0 })}
                    min="0"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Skills/Expertise</label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                      placeholder="Add a skill and press Enter"
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profileForm.skills.map((skill, i) => (
                      <span key={i} className="flex items-center space-x-1 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">
                        <span>{skill}</span>
                        <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-600">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Profile Image URL</label>
                  <input
                    type="url"
                    value={profileForm.image_url}
                    onChange={(e) => setProfileForm({ ...profileForm, image_url: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                    placeholder="https://..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium"
                >
                  Save Profile
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TherapistDashboardPage;
