import 'dart:async';
import 'package:flutter/material.dart';
import 'components/blog_tile.dart';
import 'components/banner_image.dart';
import 'components/default_app_bar.dart';
import 'models/blog.dart';
import 'blog_detial.dart';
import 'styles.dart';

const ListItemHeight = 245.0;

class BlogList extends StatefulWidget {
  @override
  createState() => _BlogListState();
}

class _BlogListState extends State<BlogList> {
  List<Blog> blogs = [];
  bool loading = false;

  @override
  void initState() {
    super.initState();
    loadData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: DefaultAppBar(),
        body: RefreshIndicator(
            onRefresh: loadData,
            child: Column(children: [
              renderProgressBar(context),
              Expanded(child: renderListView(context))
            ])));
  }

  Future<void> loadData() async {
    if (this.mounted) {
      setState(() => this.loading = true);
      Timer(Duration(milliseconds: 3000), () async {
        final blogs = await Blog.fetchAll();
        setState(() {
          this.blogs = blogs;
          this.loading = false;
        });
      });
    }
  }

  Widget renderProgressBar(BuildContext context) {
    return (this.loading
        ? LinearProgressIndicator(
            value: null,
            backgroundColor: Colors.white,
            valueColor: AlwaysStoppedAnimation<Color>(Colors.grey))
        : Container());
  }

  Widget renderListView(BuildContext context) {
    return ListView.builder(
      itemCount: this.blogs.length,
      itemBuilder: _listViewItemBuilder,
    );
  }

  Widget _listViewItemBuilder(BuildContext context, int index) {
    final blog = this.blogs[index];
    return GestureDetector(
        onTap: () => _navigateToBlogDetail(context, blog.id),
        child: Container(
          height: ListItemHeight,
          child: Stack(children: [
            _tileFooter(blog),
          ]),
        ));
  }

  void _navigateToBlogDetail(BuildContext context, int blogID) {
    Navigator.push(context,
        MaterialPageRoute(builder: (context) => BlogDetail(blogID)));
  }

  Widget _tileFooter(Blog blog) {
    final info = BlogTile(blog: blog, darkTheme: true);
    final overlay = Container(
      padding: EdgeInsets.symmetric(
          vertical: 5.0, horizontal: Styles.horizontalPaddingDefault),
      decoration: BoxDecoration(color: Colors.black.withOpacity(0.5)),
      child: info,
    );
    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [overlay],
    );
  }
}
