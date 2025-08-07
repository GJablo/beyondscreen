import PasswordUpdateForm from "../components/PasswordUpdateForm";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import Sidebar from "../components/Sidebar";

export default function UpdateProfile() {
  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
          <Sidebar />

            {/* Main content area */}
            <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-tr from-zinc-100 to-sky-100 dark:from-zinc-900 dark:to-sky-900 text-zinc-900 dark:text-zinc-100">
              <h2 className="text-2xl font-bold mb-5">Update Profile</h2>
              <div className="container mx-auto p-4">
                <Card className="max-w-md mx-auto">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Update Password</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        For security, please enter your current password and then your new password.
                      </p>
                      <PasswordUpdateForm />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </main>
          </div>
    </>
  );
}
