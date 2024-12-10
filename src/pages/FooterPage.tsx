import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

const FooterPage = () => {
  const { slug } = useParams();
  const [content, setContent] = useState<{
    title: string;
    content: string;
  } | null>(null);

  useEffect(() => {
    const loadPage = async () => {
      const { data, error } = await supabase
        .from("footer_pages")
        .select("title, content")
        .eq("slug", slug)
        .eq("active", true)
        .single();

      if (!error && data) {
        setContent(data);
      }
    };

    loadPage();
  }, [slug]);

  if (!content) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">{content.title}</h1>
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      </Card>
    </div>
  );
};

export default FooterPage;