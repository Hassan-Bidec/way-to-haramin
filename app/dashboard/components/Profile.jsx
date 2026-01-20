"use client"
import { ArrowRight, Bell, Globe, Mail, MessageSquare, Phone, Trash2, User } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
import { Badge } from '../ui/badgeVariants';
import { Button } from '../ui/button';
import { Switch } from '../ui/Switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/AlertDialogFooter';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { editProfile, getUserProfile } from '@/lib/api';
import { useAuthStore } from '@/lib/useAuthStore';
import { useTranslation } from "react-i18next";
import "../../../src/lib/i18n";

const Profile = () => {
  const { user, updateUser } = useAuthStore();
      const { t } = useTranslation();
  
    const navigate = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

    const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    email: "",
    language: "English",
  });

  // 🚀 Load Profile Data
  const loadProfile = async () => {
    setLoading(true);

    const res = await getUserProfile();
console.log("User Profile Data:", res);
    if (res?.success == true) {
      setProfileData({
       name: res.profile?.full_name
  ? res.profile.full_name.charAt(0).toUpperCase() + res.profile.full_name.slice(1)
  : "",
        phone: res.profile?.contact_no || "",
        email: res.profile?.email || "",
        language: res.profile?.language || "English",
      });
    } else {
      toast.error("Failed to load profile");
    }
    setLoading(false);
  };
 // 🚀 Save profile changes
const handleSaveProfile = async () => {
  setLoading(true);
  try {
    const payload = {
      full_name: profileData.name,
      contact_no: profileData.phone,
      email: profileData.email,
      language: profileData.language,
    };

    const res = await editProfile(payload); 

    console.log("resres" , res);
    

    if (res.status) {
      updateUser({ name: profileData.name });
      toast.success(res.message || "Profile updated successfully");
      setIsEditing(false);
      loadProfile(); // refresh profile data after update
    } else {
      toast.error(res.message || "Failed to update profile");
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    loadProfile();
  }, []);

  const handleDeleteAccount = () => {
    toast.success('Account deletion request submitted');
  };

  return (
     <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate.push('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#C7A76C] mb-8 transition-colors group"
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          <span>{t("Back to Dashboard")}</span>
        </button>

        {/* Header */}
        <div className="mb-8 bg-gradient-to-br from-[#1B2A3D] to-[#1B2A3D]/90 rounded-2xl p-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C7A76C]/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C7A76C]/10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative">
            <h1 className="text-3xl text-white mb-2">{t("Profile & Settings")}</h1>
            <p className="text-white/70">{t("Manage your account and preferences")}</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <Card className="border-none shadow-lg">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-[#1B2A3D]">{t("Profile Information")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14 bg-gray-300 text-xl">
  <AvatarImage src="" /> {/* Remove dicebear & keep empty if you want fallback always */}
  <AvatarFallback>{profileData.name
  ? profileData.name.charAt(0).toUpperCase()
  : ""
}</AvatarFallback>
</Avatar>
                <div>
                  <h3>{profileData.name}</h3>
                  <Badge variant="secondary" className="mt-1">
                    {t("Verified User")}
                  </Badge>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-[#1B2A3D] font-medium">
                    <User className="w-4 h-4 text-[#C7A76C]" />
                    {t("Full Name")}
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7A76C] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-[#1B2A3D] font-medium">
                    <Phone className="w-4 h-4 text-[#C7A76C]" />
                    {t("Phone Number")}
                    <Badge className="ml-auto text-xs bg-green-100 text-green-700 hover:bg-green-100">
                      {t("Verified")}
                    </Badge>
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={true}
                    className="w-full px-4 py-3 bg-[#F7F7F9] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7A76C] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-[#1B2A3D] font-medium">
                    <Mail className="w-4 h-4 text-[#C7A76C]" />
                    {t("Email Address")}
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={true}
                    className="w-full px-4 py-3 bg-[#F7F7F9] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7A76C] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-[#1B2A3D] font-medium">
                    <Globe className="w-4 h-4 text-[#C7A76C]" />
                    {t("Preferred Language")}
                  </label>
                  <select
                    value={profileData.language}
                    onChange={(e) => setProfileData({ ...profileData, language: e.target.value })}
                    disabled={true}
                    className="w-full px-4 py-3 bg-[#F7F7F9] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C7A76C] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
                  >
                    <option value="English">English</option>
                    <option value="Arabic">العربية</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} className="w-full bg-gradient-to-r from-[#C7A76C] to-[#C7A76C]/90 text-white hover:shadow-lg transition-all">
                    {t("Edit Profile")}
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1 border-2 border-gray-200 hover:border-[#C7A76C] hover:bg-[#F2EDE3]/30">
                      {t("Cancel")}
                    </Button>
                    <Button onClick={handleSaveProfile} className="flex-1 bg-gradient-to-r from-[#C7A76C] to-[#C7A76C]/90 text-white hover:shadow-lg transition-all">
                      {t("Save Changes")}
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="border-none shadow-lg">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-[#1B2A3D]">{t("Settings")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#F7F7F9] border border-gray-200 rounded-xl hover:border-[#C7A76C] transition-colors">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-[#C7A76C]" />
                  <div>
                    <p>{t("Push Notifications")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("Receive updates about your bookings")}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-[#F7F7F9] border border-gray-200 rounded-xl hover:border-[#C7A76C] transition-colors">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-[#C7A76C]" />
                  <div>
                    <p>{t("WhatsApp Updates")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("Get booking confirmations via WhatsApp")}
                    </p>
                  </div>
                </div>
                <Switch checked={whatsappUpdates} onCheckedChange={setWhatsappUpdates} />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          {/* <Card className="border-2 border-red-200 shadow-lg">
            <CardHeader className="border-b border-red-100">
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p>Delete Account</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-destructive border-destructive">
                      <Trash2 className="mr-2 w-4 h-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and
                        remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  )
}

export default Profile