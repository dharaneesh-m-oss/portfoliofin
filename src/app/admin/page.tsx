"use client";

import React, { useState, useEffect } from "react";
import GlassCard from "@/components/ui/GlassCard";
import GlassButton from "@/components/ui/GlassButton";

type Tab = "team" | "projects" | "experience" | "settings";

interface Teammate {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
}

interface Project {
  id: string;
  title: string;
  status: string;
  hardware: string;
  domain: string;
  impact: string;
  tags: string[];
  description: string;
  details: string[];
}

interface Experience {
  id: string;
  title: string;
  org: string;
  date: string;
  desc: string;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("team");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [teamForm, setTeamForm] = useState({ name: "", role: "", bio: "", image: "", linkedin: "" });
  const [projectForm, setProjectForm] = useState({
    title: "",
    status: "",
    hardware: "",
    domain: "",
    impact: "",
    tags: "",
    description: "",
    details: "",
  });
  const [experienceForm, setExperienceForm] = useState({ title: "", org: "", date: "", desc: "" });
  const [settingsForm, setSettingsForm] = useState<Record<string, string>>({
    "accent-color": "#0066CC",
    "void-color": "#FBFBFD",
    "text-primary-color": "#1D1D1F",
    "aurora-1": "rgba(175, 226, 255, 0.45)",
    "aurora-2": "rgba(255, 254, 167, 0.4)",
    "aurora-3": "rgba(255, 161, 161, 0.38)",
    "bg-grad-1": "#eff2ff",
    "bg-grad-2": "#f8f9ff",
    "bg-grad-3": "#edf0ff",
  });

  const [team, setTeam] = useState<Teammate[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth");
        if (!res.ok) return;
        const data = await res.json();
        setAuthenticated(Boolean(data.authenticated));
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!authenticated) return;

    const fetchData = async () => {
      const [teamRes, projectRes, experienceRes, settingsRes] = await Promise.all([
        fetch("/api/team"),
        fetch("/api/projects"),
        fetch("/api/experience"),
        fetch("/api/settings"),
      ]);

      if (teamRes.ok) setTeam(await teamRes.json());
      if (projectRes.ok) setProjects(await projectRes.json());
      if (experienceRes.ok) setExperience(await experienceRes.json());
      if (settingsRes.ok) {
        const data = await settingsRes.json();
        setSettingsForm((prev) => ({ ...prev, ...data }));
      }
    };

    fetchData();
  }, [authenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthenticated(true);
    } else {
      alert("Invalid password");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setAuthenticated(false);
  };

  const handleAddTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teamForm),
    });
    if (res.ok) {
      const created = await res.json();
      setTeam((prev) => [created, ...prev]);
      setTeamForm({ name: "", role: "", bio: "", image: "", linkedin: "" });
    }
    setSubmitting(false);
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: projectForm.title,
        status: projectForm.status,
        hardware: projectForm.hardware,
        domain: projectForm.domain,
        impact: projectForm.impact,
        tags: projectForm.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        description: projectForm.description,
        details: projectForm.details.split("\n").map((line) => line.trim()).filter(Boolean),
      }),
    });
    if (res.ok) {
      const created = await res.json();
      setProjects((prev) => [created, ...prev]);
      setProjectForm({
        title: "",
        status: "",
        hardware: "",
        domain: "",
        impact: "",
        tags: "",
        description: "",
        details: "",
      });
    }
    setSubmitting(false);
  };

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/experience", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(experienceForm),
    });
    if (res.ok) {
      const created = await res.json();
      setExperience((prev) => [created, ...prev]);
      setExperienceForm({ title: "", org: "", date: "", desc: "" });
    }
    setSubmitting(false);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settingsForm),
    });
    if (res.ok) {
      alert("Settings saved! Refresh the site to see changes.");
    }
    setSubmitting(false);
  };

  const handleDelete = async (tab: Tab, id: string) => {
    const endpoint = tab === "team" ? "/api/team" : tab === "projects" ? "/api/projects" : "/api/experience";
    const res = await fetch(`${endpoint}?id=${id}`, { method: "DELETE" });
    if (!res.ok) return;
    if (tab === "team") setTeam((prev) => prev.filter((item) => item.id !== id));
    if (tab === "projects") setProjects((prev) => prev.filter((item) => item.id !== id));
    if (tab === "experience") setExperience((prev) => prev.filter((item) => item.id !== id));
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 px-6">
        <GlassCard className="p-10 w-full max-w-md text-center">
          <p className="text-text-muted font-medium">Checking admin session...</p>
        </GlassCard>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 px-6">
        <GlassCard className="p-12 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-4 rounded-xl border border-black/10 bg-black/5"
              placeholder="Enter password..."
            />
            <GlassButton type="submit" disabled={loading} className="w-full">
              {loading ? "Authenticating..." : "Login"}
            </GlassButton>
          </form>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <GlassButton onClick={handleLogout} className="px-5 py-2 text-sm">
          Logout
        </GlassButton>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <button onClick={() => setActiveTab("team")} className={`px-4 py-2 rounded-full ${activeTab === "team" ? "bg-[#0066CC] text-white" : "bg-black/5"}`}>Team</button>
        <button onClick={() => setActiveTab("projects")} className={`px-4 py-2 rounded-full ${activeTab === "projects" ? "bg-[#0066CC] text-white" : "bg-black/5"}`}>Projects</button>
        <button onClick={() => setActiveTab("experience")} className={`px-4 py-2 rounded-full ${activeTab === "experience" ? "bg-[#0066CC] text-white" : "bg-black/5"}`}>Experience</button>
        <button onClick={() => setActiveTab("settings")} className={`px-4 py-2 rounded-full ${activeTab === "settings" ? "bg-[#0066CC] text-white" : "bg-black/5"}`}>Theme Settings</button>
      </div>

      <GlassCard className="p-8 bg-white/70">
        {activeTab === "team" && (
          <form onSubmit={handleAddTeam} className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">Add Teammate</h3>
            <input placeholder="Name" value={teamForm.name} onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })} className="w-full p-3 rounded-lg border bg-white/50" required />
            <input placeholder="Role" value={teamForm.role} onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })} className="w-full p-3 rounded-lg border bg-white/50" required />
            <textarea placeholder="Bio" value={teamForm.bio} onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })} className="w-full p-3 rounded-lg border bg-white/50" required />
            <input placeholder="Image URL (optional)" value={teamForm.image} onChange={(e) => setTeamForm({ ...teamForm, image: e.target.value })} className="w-full p-3 rounded-lg border bg-white/50" />
            <input placeholder="LinkedIn URL (optional)" value={teamForm.linkedin} onChange={(e) => setTeamForm({ ...teamForm, linkedin: e.target.value })} className="w-full p-3 rounded-lg border bg-white/50" />
            <GlassButton type="submit" disabled={submitting}>{submitting ? "Saving..." : "Add Teammate"}</GlassButton>
          </form>
        )}

        {activeTab === "projects" && (
          <form onSubmit={handleAddProject} className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">Add Project</h3>
            <input placeholder="Title" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} className="w-full p-3 rounded-lg border bg-white/50" required />
            <input placeholder="Status" value={projectForm.status} onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })} className="w-full p-3 rounded-lg border bg-white/50" required />
            <input placeholder="Hardware (optional)" value={projectForm.hardware} onChange={(e) => setProjectForm({ ...projectForm, hardware: e.target.value })} className="w-full p-3 rounded-lg border bg-white/50" />
            <input placeholder="Domain" value={projectForm.domain} onChange={(e) => setProjectForm({ ...projectForm, domain: e.target.value })} className="w-full p-3 rounded-lg border bg-white/50" required />
            <input placeholder="Impact" value={projectForm.impact} onChange={(e) => setProjectForm({ ...projectForm, impact: e.target.value })} className="w-full p-3 rounded-lg border bg-white/50" required />
            <input placeholder="Tags (comma separated)" value={projectForm.tags} onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })} className="w-full p-3 rounded-lg border bg-white/50" required />
            <textarea placeholder="Description" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} className="w-full p-3 rounded-lg border bg-white/50 min-h-28" required />
            <textarea placeholder="Details (one point per line)" value={projectForm.details} onChange={(e) => setProjectForm({ ...projectForm, details: e.target.value })} className="w-full p-3 rounded-lg border bg-white/50 min-h-28" required />
            <GlassButton type="submit" disabled={submitting}>{submitting ? "Saving..." : "Add Project"}</GlassButton>
          </form>
        )}

        {activeTab === "experience" && (
          <form onSubmit={handleAddExperience} className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">Add Experience</h3>
            <input placeholder="Title" value={experienceForm.title} onChange={(e) => setExperienceForm({ ...experienceForm, title: e.target.value })} className="w-full p-3 rounded-lg border bg-white/50" required />
            <input placeholder="Organization" value={experienceForm.org} onChange={(e) => setExperienceForm({ ...experienceForm, org: e.target.value })} className="w-full p-3 rounded-lg border bg-white/50" required />
            <input placeholder="Date (e.g. May 2026 - Present)" value={experienceForm.date} onChange={(e) => setExperienceForm({ ...experienceForm, date: e.target.value })} className="w-full p-3 rounded-lg border bg-white/50" required />
            <textarea placeholder="Description" value={experienceForm.desc} onChange={(e) => setExperienceForm({ ...experienceForm, desc: e.target.value })} className="w-full p-3 rounded-lg border bg-white/50 min-h-28" required />
            <GlassButton type="submit" disabled={submitting}>{submitting ? "Saving..." : "Add Experience"}</GlassButton>
          </form>
        )}

        {activeTab === "settings" && (
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <h3 className="text-2xl font-bold mb-4">Theme Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Accent Color</label>
                <div className="flex gap-3">
                  <input type="color" value={settingsForm["accent-color"]} onChange={(e) => setSettingsForm({ ...settingsForm, "accent-color": e.target.value })} className="h-10 w-20" />
                  <input type="text" value={settingsForm["accent-color"]} onChange={(e) => setSettingsForm({ ...settingsForm, "accent-color": e.target.value })} className="flex-1 p-2 border rounded-lg bg-white/50" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Background (Void)</label>
                <div className="flex gap-3">
                  <input type="color" value={settingsForm["void-color"]} onChange={(e) => setSettingsForm({ ...settingsForm, "void-color": e.target.value })} className="h-10 w-20" />
                  <input type="text" value={settingsForm["void-color"]} onChange={(e) => setSettingsForm({ ...settingsForm, "void-color": e.target.value })} className="flex-1 p-2 border rounded-lg bg-white/50" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Text Primary</label>
                <div className="flex gap-3">
                  <input type="color" value={settingsForm["text-primary-color"]} onChange={(e) => setSettingsForm({ ...settingsForm, "text-primary-color": e.target.value })} className="h-10 w-20" />
                  <input type="text" value={settingsForm["text-primary-color"]} onChange={(e) => setSettingsForm({ ...settingsForm, "text-primary-color": e.target.value })} className="flex-1 p-2 border rounded-lg bg-white/50" />
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-black/5 md:col-span-2">
                <h4 className="font-semibold mb-2">Aurora & Gradients (RGBA/Hex)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input placeholder="Aurora 1 (rgba)" value={settingsForm["aurora-1"]} onChange={(e) => setSettingsForm({ ...settingsForm, "aurora-1": e.target.value })} className="p-2 border rounded-lg bg-white/50 text-xs" />
                  <input placeholder="Aurora 2 (rgba)" value={settingsForm["aurora-2"]} onChange={(e) => setSettingsForm({ ...settingsForm, "aurora-2": e.target.value })} className="p-2 border rounded-lg bg-white/50 text-xs" />
                  <input placeholder="Aurora 3 (rgba)" value={settingsForm["aurora-3"]} onChange={(e) => setSettingsForm({ ...settingsForm, "aurora-3": e.target.value })} className="p-2 border rounded-lg bg-white/50 text-xs" />
                  <input placeholder="Bg Grad 1" value={settingsForm["bg-grad-1"]} onChange={(e) => setSettingsForm({ ...settingsForm, "bg-grad-1": e.target.value })} className="p-2 border rounded-lg bg-white/50 text-xs" />
                  <input placeholder="Bg Grad 2" value={settingsForm["bg-grad-2"]} onChange={(e) => setSettingsForm({ ...settingsForm, "bg-grad-2": e.target.value })} className="p-2 border rounded-lg bg-white/50 text-xs" />
                  <input placeholder="Bg Grad 3" value={settingsForm["bg-grad-3"]} onChange={(e) => setSettingsForm({ ...settingsForm, "bg-grad-3": e.target.value })} className="p-2 border rounded-lg bg-white/50 text-xs" />
                </div>
              </div>
            </div>

            <GlassButton type="submit" disabled={submitting}>{submitting ? "Saving..." : "Save Theme Settings"}</GlassButton>
          </form>
        )}
      </GlassCard>

      <div className="mt-8 space-y-4 pb-16">
        {activeTab === "team" &&
          team.map((member) => (
            <GlassCard key={member.id} className="p-5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-text-primary">{member.name}</p>
                <p className="text-sm text-text-muted">{member.role}</p>
              </div>
              <button className="px-4 py-2 rounded-full bg-black/5 text-sm" onClick={() => handleDelete("team", member.id)}>
                Delete
              </button>
            </GlassCard>
          ))}

        {activeTab === "projects" &&
          projects.map((project) => (
            <GlassCard key={project.id} className="p-5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-text-primary">{project.title}</p>
                <p className="text-sm text-text-muted">{project.domain}</p>
              </div>
              <button className="px-4 py-2 rounded-full bg-black/5 text-sm" onClick={() => handleDelete("projects", project.id)}>
                Delete
              </button>
            </GlassCard>
          ))}

        {activeTab === "experience" &&
          experience.map((item) => (
            <GlassCard key={item.id} className="p-5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-text-primary">{item.title}</p>
                <p className="text-sm text-text-muted">{item.org}</p>
              </div>
              <button className="px-4 py-2 rounded-full bg-black/5 text-sm" onClick={() => handleDelete("experience", item.id)}>
                Delete
              </button>
            </GlassCard>
          ))}
      </div>
    </div>
  );
}
