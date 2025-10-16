import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar } from "@/components/ui/avatar";
import { Send } from "lucide-react";


const API_BASE = "https://warehouseman-az-back.vercel.app/portfolio";

type User = {
  id: string;
  fullName: string;
  email: string;
};

type Message = {
  id?: string;
  from: string;
  to: string;
  text: string;
  createdAt?: string;
};

const storageKey = "wm_chat_demo_messages";

const Chat = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("wm_token"));
  const [me, setMe] = useState<User | null>(() => {
    const raw = localStorage.getItem("wm_user");
    return raw ? JSON.parse(raw) : null;
  });

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const pollRef = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (token && me) fetchUsers();
    // cleanup poll on unmount
    return () => {
      if (pollRef.current) window.clearInterval(pollRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, me]);

  useEffect(() => {
    if (selectedUser && me) {
      fetchMessages();
      // start polling
      if (pollRef.current) window.clearInterval(pollRef.current);
      pollRef.current = window.setInterval(fetchMessages, 3000);
    } else {
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
      setMessages([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser, me]);

  useEffect(() => {
    // auto scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // --------- Backend API wrappers with fallback to localStorage demo mode ---------
  const isDemo = async (res?: Response) => {
    // simple check: if fetch failed or 404, treat as demo
    if (!res) return true;
    return !res.ok;
  };

  const login = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Backend auth failed");
      const data = await res.json();
      // expected { token, user }
      setToken(data.token);
      setMe(data.user);
      localStorage.setItem("wm_token", data.token);
      localStorage.setItem("wm_user", JSON.stringify(data.user));
      // fetchUsers will run via effect
    } catch {
      // fallback demo login: accept any credentials and create demo user
      const demoUser: User = { id: `demo-${email}`, fullName: email.split("@")[0] || email, email };
      setToken("demo-token");
      setMe(demoUser);
      localStorage.setItem("wm_token", "demo-token");
      localStorage.setItem("wm_user", JSON.stringify(demoUser));
      // seed one more demo user in localStorage users list
      const demoUsers = [
        demoUser,
        { id: "demo-colleague", fullName: "Kolleqa", email: "kolleqa@demo" },
      ];
      localStorage.setItem("wm_demo_users", JSON.stringify(demoUsers));
      setUsers(demoUsers);
    }
  };

  const logout = () => {
    setToken(null);
    setMe(null);
    localStorage.removeItem("wm_token");
    localStorage.removeItem("wm_user");
    setSelectedUser(null);
    setMessages([]);
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch(`${API_BASE}/users`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (await isDemo(res)) {
        const demo = localStorage.getItem("wm_demo_users");
        const demoUsers = demo ? JSON.parse(demo) : [];
        setUsers(demoUsers);
      } else {
        const data = await res.json();
        // adapt data shape if needed
        const mapped: User[] = Array.isArray(data)
          ? data.map((u: any) => ({ id: u.id || u._id || u.email, fullName: u.fullName || u.name || u.email, email: u.email }))
          : [];
        setUsers(mapped.filter((u) => u.id !== me?.id));
      }
    } catch {
      const demo = localStorage.getItem("wm_demo_users");
      const demoUsers = demo ? JSON.parse(demo) : [];
      setUsers(demoUsers);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchMessages = async () => {
    if (!me || !selectedUser) return;
    setLoadingMessages(true);
    try {
      const res = await fetch(
        `${API_BASE}/messages?user1=${encodeURIComponent(me.id)}&user2=${encodeURIComponent(selectedUser.id)}`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      if (await isDemo(res)) {
        // demo: read from localStorage
        const raw = localStorage.getItem(storageKey);
        const all: Message[] = raw ? JSON.parse(raw) : [];
        const between = all.filter(
          (m) =>
            (m.from === me.id && m.to === selectedUser.id) ||
            (m.from === selectedUser.id && m.to === me.id)
        );
        setMessages(between);
      } else {
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
      }
    } catch {
      const raw = localStorage.getItem(storageKey);
      const all: Message[] = raw ? JSON.parse(raw) : [];
      const between = all.filter(
        (m) =>
          (m.from === me.id && m.to === selectedUser.id) ||
          (m.from === selectedUser.id && m.to === me.id)
      );
      setMessages(between);
    } finally {
      setLoadingMessages(false);
    }
  };

  const sendMessage = async () => {
    if (!me || !selectedUser || !text.trim()) return;
    const msg: Message = {
      from: me.id,
      to: selectedUser.id,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    setText("");
    // optimistic UI
    setMessages((prev) => [...prev, msg]);

    try {
      const res = await fetch(`${API_BASE}/messages`, {
        method: "POST",
        headers: token ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` } : { "Content-Type": "application/json" },
        body: JSON.stringify(msg),
      });
      if (await isDemo(res)) {
        // store in localStorage for demo
        const raw = localStorage.getItem(storageKey);
        const all: Message[] = raw ? JSON.parse(raw) : [];
        all.push(msg);
        localStorage.setItem(storageKey, JSON.stringify(all));
      } else {
        // optionally update with server-returned message
        const saved = await res.json();
        // replace last optimistic message if server returned id
        if (saved && saved.id) {
          setMessages((prev) => {
            const copy = prev.slice();
            copy[copy.length - 1] = saved;
            return copy;
          });
        }
      }
    } catch {
      // already added to local messages; nothing else to do
    }
  };

  // ---------- UI ----------
  if (!me) {
    // Login view
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Mesajlaşma - Giriş</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="password">Şifrə</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="flex gap-2">
                <Button onClick={login} className="w-full">Daxil ol</Button>
                <Button variant="outline" onClick={() => {
                  // quick demo account
                  setEmail("demo@demo");
                  setPassword("demo");
                }}>Demo</Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Qeyd: Backend API mövcud deyilsə səhifə local demo rejimində işləyəcək.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users list */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>İstifadəçilər</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-muted-foreground">Giriş etmiş: <strong>{me.fullName}</strong></div>
                  <Button variant="ghost" size="sm" onClick={logout}>Çıxış</Button>
                </div>
                <div className="space-y-2">
                  {loadingUsers ? (
                    <div className="text-sm">Yüklənir...</div>
                  ) : users.length === 0 ? (
                    <div className="text-sm text-muted-foreground">Heç bir istifadəçi yoxdur</div>
                  ) : (
                    users.map((u) => (
                      <div
                        key={u.id}
                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted ${selectedUser?.id === u.id ? "bg-muted" : ""}`}
                        onClick={() => setSelectedUser(u)}
                      >
                        <Avatar>
                          <div className="bg-primary/10 text-primary w-8 h-8 flex items-center justify-center rounded-full">
                            {u.fullName?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                        </Avatar>
                        <div>
                          <div className="font-medium">{u.fullName}</div>
                          <div className="text-xs text-muted-foreground">{u.email}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat area */}
        <div className="lg:col-span-2 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <div className="bg-primary/10 text-primary w-8 h-8 flex items-center justify-center rounded-full">
                      {selectedUser ? selectedUser.fullName.charAt(0).toUpperCase() : "?"}
                    </div>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedUser ? selectedUser.fullName : "Seçilmiş istifadəçi yoxdur"}</div>
                    <div className="text-xs text-muted-foreground">{selectedUser ? selectedUser.email : "Bir istifadəçi seçin"}</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{loadingMessages ? "Yüklənir..." : ""}</div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col overflow-hidden">
              <div ref={scrollRef} className="flex-1 overflow-auto space-y-4 px-2 py-3">
                {selectedUser ? (
                  messages.length === 0 ? (
                    <div className="text-center text-sm text-muted-foreground">Söhbət boşdur. Mesaj göndərin.</div>
                  ) : (
                    messages.map((m, i) => {
                      const mine = m.from === me.id;
                      return (
                        <div key={i} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[80%] p-3 rounded-lg ${mine ? "bg-primary text-primary-foreground" : "bg-card/80"}`}>
                            <div className="text-sm">{m.text}</div>
                            <div className="text-xs text-muted-foreground mt-1">{new Date(m.createdAt || Date.now()).toLocaleString()}</div>
                          </div>
                        </div>
                      );
                    })
                  )
                ) : (
                  <div className="text-center text-muted-foreground">Soldan bir istifadəçi seçin və söhbətə başlayın</div>
                )}
              </div>

              {/* composer */}
              <div className="pt-3 border-t border-border">
                <div className="flex gap-2 items-center">
                  <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={selectedUser ? "Mesaj yazın..." : "İlk öncə istifadəçi seçin"}
                    disabled={!selectedUser}
                    onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                  />
                  <Button disabled={!selectedUser || !text.trim()} onClick={sendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;