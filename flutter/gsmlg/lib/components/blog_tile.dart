import 'package:flutter/material.dart';
import '../models/blog.dart';
import '../styles.dart';

const BlogTileHeight = 100.0;

class BlogTile extends StatelessWidget {
  final Blog blog;
  final bool darkTheme;

  BlogTile({required this.blog, required this.darkTheme});

  @override
  Widget build(BuildContext context) {
    final title = blog.title;
    final author = blog.author;
    final date = blog.date;
    return Container(
      padding: EdgeInsets.all(0.0),
      height: BlogTileHeight,
      child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('$title',
                overflow: TextOverflow.ellipsis,
                maxLines: 1,
                style: this.darkTheme
                    ? Styles.blogTileTitleDark
                    : Styles.blogTileTitleLight),
            Text('$author', style: Styles.blogTileSubTitle),
            Text('$date', style: Styles.blogTileCaption),
          ]),
    );
  }
}
