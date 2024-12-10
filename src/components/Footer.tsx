import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";

interface FooterPage {
  title: string;
  slug: string;
  category?: string;
}

const Footer = () => {
  const [pages, setPages] = useState<FooterPage[]>([]);
  const [blogPosts, setBlogPosts] = useState<FooterPage[]>([]);

  useEffect(() => {
    const loadPages = async () => {
      const { data, error } = await supabase
        .from("footer_pages")
        .select("title, slug, category")
        .eq("active", true)
        .order("title");

      if (error) {
        console.error("Error loading footer pages:", error);
        return;
      }

      if (data) {
        const blogs = data.filter(page => page.category === 'blog');
        const otherPages = data.filter(page => page.category !== 'blog');
        setBlogPosts(blogs);
        setPages(otherPages);
      }
    };

    loadPages();
  }, []);

  if (!pages.length && !blogPosts.length) {
    return null; // Don't render footer if no content
  }

  return (
    <footer className="w-full py-12 mt-auto bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Sobre</h3>
            <div className="flex flex-col space-y-2">
              {pages.map((page) => (
                <Link
                  key={page.slug}
                  to={`/page/${page.slug}`}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {page.title}
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Blog</h3>
            <div className="flex flex-col space-y-2">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/page/${post.slug}`}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {post.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <div className="flex flex-col space-y-2 text-sm text-gray-600">
              <p>Email: contato@onlinerecibo.com.br</p>
              <div className="flex space-x-4 mt-2">
                <a 
                  href="https://facebook.com/onlinerecibo" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gray-900 transition-colors"
                >
                  Facebook
                </a>
                <a 
                  href="https://instagram.com/onlinerecibo" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gray-900 transition-colors"
                >
                  Instagram
                </a>
                <a 
                  href="https://linkedin.com/company/onlinerecibo" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gray-900 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Direitos Reservados - onlinerecibo.com.br</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;