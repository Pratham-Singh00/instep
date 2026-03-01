<?php
/**
 * The template for displaying single posts
 * Uses modern React-style design to match the blog
 *
 * @package InStepCommunityConnect
 * @since 7.6.0
 */

get_header();
?>

<div class="wordpress-post-container" style="max-width: 1200px; margin: 0 auto; padding: 80px 20px 40px;">
    <?php if (is_preview() || isset($_GET['preview'])): ?>
    <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 12px 20px; border-radius: 6px; margin-bottom: 30px; text-align: center;">
        <strong>📝 Preview Mode</strong> - You are viewing a preview of this post.
    </div>
    <?php endif; ?>
    <?php
    while (have_posts()) :
        the_post();
        
        // Get custom author if set
        $custom_author = get_post_meta(get_the_ID(), '_instep_custom_author', true);
        $author = $custom_author ?: get_the_author();
        
        // Get categories and tags
        $categories = get_the_category();
        $tags = get_the_tags();
        ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            
            <!-- Back Button -->
            <div style="margin-bottom: 30px;">
                <a href="/blog" style="display: inline-flex; align-items: center; color: #64748b; text-decoration: none; font-size: 14px;">
                    <span style="margin-right: 8px;">←</span> Go back to all articles
                </a>
            </div>

            <div style="max-width: 900px; margin: 0 auto;">
                <!-- Header Section -->
                <header style="text-align: center; margin-bottom: 48px;">
                    
                    <!-- Categories & Tags -->
                    <div style="margin-bottom: 24px;">
                        <?php if ($categories): ?>
                            <?php foreach($categories as $cat): ?>
                                <span style="display: inline-block; background: #f0fdfa; color: #0f766e; padding: 6px 16px; border-radius: 4px; font-size: 14px; margin: 4px;"><?php echo esc_html($cat->name); ?></span>
                            <?php endforeach; ?>
                        <?php endif; ?>
                        <?php if ($tags): ?>
                            <?php foreach(array_slice($tags, 0, 3) as $tag): ?>
                                <span style="display: inline-block; border: 1px solid #e5e5e5; color: #666; padding: 6px 16px; border-radius: 4px; font-size: 14px; margin: 4px;">#<?php echo esc_html($tag->name); ?></span>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </div>

                    <!-- Title -->
                    <h1 style="font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; line-height: 1.2; margin-bottom: 24px; color: #0f172a;">
                        <?php the_title(); ?>
                    </h1>

                    <!-- Meta Data -->
                    <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 16px; color: #64748b; margin-bottom: 32px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <div style="width: 32px; height: 32px; border-radius: 50%; background: #f0fdfa; display: flex; align-items: center; justify-content: center;">
                                <span style="color: #0f766e; font-size: 16px;">👤</span>
                            </div>
                            <span style="font-weight: 500; color: #0f172a;"><?php echo esc_html($author); ?></span>
                        </div>
                        <span style="color: #cbd5e1;">•</span>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 16px;">📅</span>
                            <time datetime="<?php echo get_the_date('c'); ?>"><?php echo get_the_date('F j, Y'); ?></time>
                        </div>
                        <span style="color: #cbd5e1;">•</span>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 16px;">⏱️</span>
                            <span><?php echo ceil(str_word_count(strip_tags(get_the_content())) / 200); ?> min read</span>
                        </div>
                    </div>

                    <!-- Featured Image -->
                    <?php if (has_post_thumbnail()): ?>
                        <div style="border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); margin-bottom: 32px; max-height: 500px;">
                            <?php the_post_thumbnail('large', ['style' => 'width: 100%; height: 100%; object-fit: cover;']); ?>
                        </div>
                    <?php endif; ?>
                </header>

                <!-- Content -->
                <div style="background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #e5e5e5; padding: clamp(32px, 5vw, 64px); margin-bottom: 48px;">
                    <div class="entry-content" style="line-height: 1.8; font-size: 18px; color: #334155;">
                        <?php the_content(); ?>
                    </div>
                </div>

            </div>
        </article>

        <?php
        // Display post navigation only if not in preview mode
        if (!is_preview()) {
            the_post_navigation([
                'prev_text' => '<span style="color: #64748b; font-size: 12px;">Previous:</span> <span style="color: #0f766e; font-weight: 600;">%title</span>',
                'next_text' => '<span style="color: #64748b; font-size: 12px;">Next:</span> <span style="color: #0f766e; font-weight: 600;">%title</span>',
            ]);
        }
        ?>

    <?php endwhile; ?>

    <?php if (!is_preview()) : ?>
        <div style="margin-top: 40px; text-align: center;">
            <a href="/blog" style="display: inline-block; padding: 14px 32px; background: #0f766e; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; transition: background 0.2s;">
                ← Back to Blog
            </a>
        </div>
    <?php endif; ?>
</div>

<style>
    body {
        background: linear-gradient(135deg, rgba(15, 118, 110, 0.03) 0%, rgba(249, 115, 22, 0.03) 100%);
    }
    
    .wordpress-post-container .entry-content h2 {
        font-size: 1.875em;
        margin-top: 40px;
        margin-bottom: 20px;
        color: #0f766e;
        font-weight: 700;
    }
    
    .wordpress-post-container .entry-content h3 {
        font-size: 1.5em;
        margin-top: 32px;
        margin-bottom: 16px;
        color: #14b8a6;
        font-weight: 600;
    }
    
    .wordpress-post-container .entry-content p {
        margin-bottom: 24px;
    }
    
    .wordpress-post-container .entry-content ul,
    .wordpress-post-container .entry-content ol {
        margin-bottom: 24px;
        padding-left: 40px;
    }
    
    .wordpress-post-container .entry-content li {
        margin-bottom: 12px;
    }
    
    .wordpress-post-container .entry-content a {
        color: #0f766e;
        text-decoration: underline;
        font-weight: 500;
    }
    
    .wordpress-post-container .entry-content a:hover {
        color: #14b8a6;
    }
    
    .wordpress-post-container .entry-content strong {
        font-weight: 700;
        color: #0f172a;
    }
    
    .wordpress-post-container .post-navigation {
        margin-top: 48px;
        padding-top: 48px;
        border-top: 2px solid #e5e5e5;
    }
    
    .wordpress-post-container .post-navigation a {
        display: block;
        padding: 24px;
        background: white;
        border-radius: 12px;
        text-decoration: none;
        color: #1e293b;
        transition: all 0.2s;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        border: 1px solid #e5e5e5;
    }
    
    .wordpress-post-container .post-navigation a:hover {
        background: #f0fdfa;
        box-shadow: 0 4px 12px rgba(15, 118, 110, 0.15);
        transform: translateY(-2px);
    }
</style>

<?php
get_footer();
